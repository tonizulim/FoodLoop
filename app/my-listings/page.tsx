"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserListings,
  deleteFoodListing,
  editFoodListing,
} from "@/lib/itemsActions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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

export default function MyListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserListings();
        setListings(data);
      } catch {
        router.push("/login");
      }
    };
    load();
  }, []);

  const reload = async () => {
    const data = await getUserListings();
    setListings(data);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {listings.length === 0 && (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="mb-4">No listings yet</p>
            <Button onClick={() => router.push("/add-food")}>
              Add food
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {listings.map((l) => (
          <Card key={l.id}>
            <CardHeader>
              <div className="flex justify-between">
                <div>
                  <CardTitle>{l.title}</CardTitle>
                  <CardDescription>{l.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setEditing(l);
                      setForm({
                        title: l.title,
                        description: l.description,
                        publishedAt: l.publishedAt.slice(0, 16),
                        expiresAt: l.expiresAt.slice(0, 16),
                      });
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={async () => {
                      await deleteFoodListing(l.id);
                      reload();
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
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

          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Published</Label>
              <Input
                type="datetime-local"
                value={form.publishedAt}
                onChange={(e) =>
                  setForm({ ...form, publishedAt: e.target.value })
                }
              />
            </div>

            <div>
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
            <Button variant="outline" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button
              onClick={async () => {
                try {
                  await editFoodListing(editing.id, form);
                  setEditing(null);
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
