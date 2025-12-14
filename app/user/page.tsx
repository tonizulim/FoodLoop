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
} from "@/components/ui/dialog"
import { MapPin, Clock, Pencil, Trash2, AlertCircle } from "lucide-react";

export default function MyListingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());
  const [listings, setListings] = useState<FoodListing[]>([]);
  const [editingListing, setEditingListing] = useState<FoodListing | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    hours: "24",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(currentUser);
    loadListings("1");
  }, [router]);

  const loadListings = async (userId: string) => {
    const userListings = getUserListings(1);
    setListings(await userListings);
  };

  // const handleDelete = async (id: string) => {
  //   if (confirm("Are you sure you want to delete this listing?")) {
  //     const result = deleteFoodListing(1);
  //     if (await result) {
  //       setSuccess("Listing deleted successfully!");
  //       if (await user) loadListings("1");
  //       setTimeout(() => setSuccess(""), 3000);
  //     } else {
  //       setError("Failed to delete listing");
  //     }
  //   }
  // };

  // const handleEditClick = (listing: FoodListing) => {
  //   setEditingListing(listing);
  //   const hoursRemaining = Math.round(
  //     (new Date(listing.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60)
  //   );
  //   setFormData({
  //     title: listing.title,
  //     description: listing.description,
  //     location: listing.location,
  //     address: listing.address,
  //     hours: Math.max(1, hoursRemaining).toString(),
  //   });
  //   setError("");
  // };

  // const handleEditSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");

  //   if (!formData.title.trim()) {
  //     setError("Please enter a title");
  //     return;
  //   }
  //   if (!formData.description.trim()) {
  //     setError("Please enter a description");
  //     return;
  //   }
  //   if (!formData.location.trim()) {
  //     setError("Please enter a location name");
  //     return;
  //   }
  //   if (!formData.address.trim()) {
  //     setError("Please enter an address");
  //     return;
  //   }

  //   if (editingListing) {
  //     const expiresAt = new Date(
  //       Date.now() + Number.parseInt(formData.hours) * 60 * 60 * 1000
  //     ).toISOString();

  //     const result = editFoodListing(1, {
  //       title: formData.title,
  //       description: formData.description,
  //       location: formData.location,
  //       address: formData.address,
  //       expiresAt,
  //     });

  //     if (await result) {
  //       setSuccess("Listing updated successfully!");
  //       setEditingListing(null);
  //       if (await user) loadListings("1");
  //       setTimeout(() => setSuccess(""), 3000);
  //     } else {
  //       setError("Failed to update listing");
  //     }
  //   }
  // };

  // const getTimeRemaining = (expiresAt: string) => {
  //   const now = new Date().getTime();
  //   const expires = new Date(expiresAt).getTime();
  //   const diff = expires - now;

  //   if (diff <= 0) return "Expired";

  //   const hours = Math.floor(diff / (1000 * 60 * 60));
  //   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  //   if (hours > 24) {
  //     const days = Math.floor(hours / 24);
  //     return `${days} day${days > 1 ? "s" : ""} left`;
  //   }

  //   if (hours > 0) {
  //     return `${hours}h ${minutes}m left`;
  //   }

  //   return `${minutes}m left`;
  // };
  // if (!user) {
  //   return null;
  // }

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
                          // onClick={() => handleEditClick(listing)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          // onClick={() => handleDelete(listing.id)}
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
                        <span>
                          {listing.location} - {listing.address}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
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

          <form >
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
                <Label htmlFor="edit-location">Location Name</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g., Community Center"
                />
              </div>

              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Input
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g., 123 Main St"
                />
              </div>

              <div>
                <Label htmlFor="edit-hours">Available for (hours)</Label>
                <Input
                  id="edit-hours"
                  type="number"
                  min="1"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: e.target.value })
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
