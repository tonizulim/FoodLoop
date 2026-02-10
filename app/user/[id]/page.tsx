"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getUser, updateUser } from "@/lib/server-actions/user";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const user = await getUser(userId);
        if (!user) throw new Error("User not found");

        setName(user.name || "");
        setEmail(user.email || "");
        setShopName(user.shop?.name || "");
        setShopAddress(user.shop?.address || "");
        setLat(user.shop?.location?.toString() || "");
        setLng(user.shop?.location?.toString() || "");
      } catch (err: any) {
        setError(err.message || "Failed to load user");
      }
    }

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !shopName || !shopAddress || !lat || !lng) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await updateUser(userId, {
        name,
        email,
        shopName,
        shopAddress,
        location: [Number(lat), Number(lng)],
      });
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-secondary/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Edit user & shop</CardTitle>
          <CardDescription>
            Update user information and their shop details
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Shop name</Label>
              <Input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Shop address</Label>
              <Input
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update user & shop"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
