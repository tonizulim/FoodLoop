"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getUserListings,
  deleteFoodListing,
  editFoodListing,
  type FoodListing,
  CurrentUser,
} from "@/lib/auth";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Clock, Pencil, Trash2, AlertCircle } from "lucide-react";
import formatDateDayMonthTime from "@/lib/helpers";

export default function MyListingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [editingListing, setEditingListing] = useState<FoodListing | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    expiresAt: "",
    publishedAt: "",
    location: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const u = await getCurrentUser("1");
      if (!u) {
        router.push("/login");
        return;
      }
      setUser(u);
      loadListings("1");
    };

    loadUser();
  }, [router]);

  const loadListings = async (userId: string) => {
    const userListings = getUserListings(1);
    setListings(await userListings);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      const result = deleteFoodListing(Number(id));
      if (await result) {
        setSuccess("Listing deleted successfully!");
        if (await user) loadListings("1");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError("Failed to delete listing");
      }
    }
  };

  const handleEditClick = (listing: FoodListing) => {
  setEditingListing(listing);

  setFormData({
  title: listing.title,
  description: listing.description,
  location: listing.location,
  address: listing.address,
  publishedAt: listing.publishedAt.slice(0, 16),
  expiresAt: listing.expiresAt.slice(0, 16),
});


  setError("");
};

  const handleEditSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (!editingListing) return;

  if (!formData.title.trim() || !formData.description.trim()) {
    setError("Title and description are required");
    return;
  }

  const result = await editFoodListing(Number(editingListing.id), {
  title: formData.title,
  description: formData.description,
  publishedAt: new Date(formData.publishedAt).toISOString(),
  expiresAt: new Date(formData.expiresAt).toISOString(),
  image: editingListing.image,
});


  if (result) {
    setSuccess("Listing updated successfully!");
    setEditingListing(null);
    if (user) loadListings("1");
    setTimeout(() => setSuccess(""), 3000);
  } else {
    setError("Failed to update listing");
  }
};

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              My Listings
            </h1>
            <p className="text-muted-foreground">
              Manage your food sharing listings
            </p>
          </div>

          {success && (
            <Alert className="mb-6 border-primary/50 bg-primary/10">
              <AlertDescription className="text-primary">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {listings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't posted any food listings yet.
                </p>
                <Button onClick={() => router.push("/add-food")}>
                  Share Your First Food
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {listing.title}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {listing.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditClick(listing)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(listing.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{listing.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          {formatDateDayMonthTime(listing.publishedAt)} - {formatDateDayMonthTime(listing.expiresAt)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={!!editingListing}
        onOpenChange={(open: any) => !open && setEditingListing(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Listing</DialogTitle>
            <DialogDescription>
              Update your food sharing listing details
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Fresh Vegetables"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe what you're sharing..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="edit-publishedAt">Published At</Label>
                <Input
                  id="edit-publishedAt"
                  type="datetime-local"
                  value={formData.publishedAt}
                  onChange={(e) =>
                    setFormData({ ...formData, publishedAt: e.target.value })
                  }
                />
              </div>

              <div>
                <Label htmlFor="edit-expiresAt">Expires At</Label>
                <Input
                  id="edit-expiresAt"
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData({ ...formData, expiresAt: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingListing(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
