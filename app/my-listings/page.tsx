"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserListings,
  deleteFoodListing,
  editFoodListing,
} from "@/lib/itemsActions";
import { supabaseClient as supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export default function MyListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<any | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getUserListings();
        setListings(data);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const reload = async () => {
    const data = await getUserListings();
    setListings(data);
  };

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("food-images")
      .upload(fileName, imageFile);

    if (error) return null;

    const { data } = supabase.storage
      .from("food-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {loading && (
        <div className="space-y-4">
          <Card className="h-24 animate-pulse bg-muted" />
          <Card className="h-24 animate-pulse bg-muted" />
          <Card className="h-24 animate-pulse bg-muted" />
        </div>
      )}

      {!loading && listings.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-muted/30 rounded-2xl">
          <Image
            src="/empty-food.png"
            alt="No food available"
            width={160}
            height={160}
            className="mb-6 opacity-80"
          />
          <h3 className="text-xl font-semibold mb-2">
            You don't have any listings yet
          </h3>
        </div>
      )}

      <div className="space-y-4">
        {listings.map((l) => (
          <Card key={l.id}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Image
                  src={l.image && l.image.length > 0 ? l.image : "/itemImg.png"}
                  alt={l.title}
                  width={72}
                  height={72}
                  className="w-18 h-18 object-cover rounded-md"
                />
                <div>
                  <CardTitle>{l.title}</CardTitle>
                  <CardDescription>{l.description}</CardDescription>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button
                    className="cursor-pointer"
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setEditing(l);
                      setForm({
                        title: l.title,
                        description: l.description,
                        publishedAt: new Date(l.publishedAt)
                          .toISOString()
                          .slice(0, 16),
                        expiresAt: new Date(l.expiresAt)
                          .toISOString()
                          .slice(0, 16),
                        image: l.image || "",
                        food_id: l.food_id,
                      });
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setDeleting(l)}
                    className="cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                  <Dialog
                    open={!!deleting}
                    onOpenChange={() => setDeleting(null)}
                  >
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm delete</DialogTitle>
                      </DialogHeader>
                      <p>
                        Are you sure you want to delete "{deleting?.title}"?
                      </p>
                      <DialogFooter className="mt-4">
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          onClick={() => setDeleting(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="cursor-pointer"
                          variant="destructive"
                          onClick={async () => {
                            if (!deleting) return;
                            await deleteFoodListing(deleting.id);
                            setDeleting(null);
                            reload();
                          }}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit listing</DialogTitle>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            {/* Image */}
            <div className="flex flex-col gap-1">
              <Label>Change image</Label>
              <label className="flex items-center justify-left w-full h-12 px-4 border rounded-md cursor-pointer hover:bg-muted/70 transition">
                <span className="text-sm text-muted-foreground">
                  {form.image
                    ? "Change image of your food"
                    : "Upload image of your food"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      setImageFile(file);
                      setFileName(file.name);
                    }
                  }}
                />
              </label>
            </div>

            {/* Published */}
            <div className="flex flex-col gap-1">
              <Label>Published</Label>
              <Input
                type="datetime-local"
                value={form.publishedAt}
                disabled
                onChange={(e) =>
                  setForm({ ...form, publishedAt: e.target.value })
                }
              />
            </div>

            {/* Expires */}
            <div className="flex flex-col gap-1">
              <Label>Expires</Label>
              <Input
                type="datetime-local"
                value={form.expiresAt}
                onChange={(e) =>
                  setForm({ ...form, expiresAt: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => setEditing(null)}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              onClick={async () => {
                // Konvertiraj stringove u Date objekte
                const published = new Date(form.publishedAt);
                const expires = new Date(form.expiresAt);

                // Provjera
                if (expires < published) {
                  setError("Expires date cannot be before published date");
                  return; // zaustavlja funkciju
                }

                try {
                  let imageUrl = form.image;

                  if (imageFile) {
                    const uploadedUrl = await uploadImage();
                    if (uploadedUrl) imageUrl = uploadedUrl;
                  }

                  await editFoodListing(editing.id, {
                    ...form,
                    image: imageUrl,
                  });

                  setEditing(null);
                  setImageFile(null);
                  setError(""); // očisti grešku
                  reload();
                } catch {
                  setError("Update failed");
                }
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
