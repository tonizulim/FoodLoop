"use client";
import { redirect } from "next/navigation";
import { getAllUsers } from "@/lib/server-actions/user";
import { isAdmin } from "@/lib/middleware/isAdmin";
import Map from "../../components/Map";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { adminCreateUser } from "@/hooks/adminCreateUser";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !name ||
      !email ||
      !password ||
      !shopName ||
      !shopAddress ||
      !lat ||
      !lng
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await adminCreateUser({
        name,
        email,
        password,
        shopName,
        shopAddress,
        location: [Number(lat), Number(lng)],
      });

      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const fetchAddressFromCoords = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      );

      const data = await res.json();

      if (!data?.address) return;

      const { road, house_number, city, town, village } = data.address;

      const streetPart = [road, house_number].filter(Boolean).join(" ");
      const cityPart = city || town || village || "";

      const formattedAddress = [streetPart, cityPart]
        .filter(Boolean)
        .join(", ");

      setShopAddress(formattedAddress);
    } catch (err) {
      console.error("Failed to fetch address", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-secondary/30">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create user & shop</CardTitle>
          <CardDescription>
            Admin creates a new user with their shop
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
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Shop name</Label>
              <Input
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Shop address</Label>
              <Input
                required
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>

            <div className="h-64 w-full rounded-md overflow-hidden">
              <Map
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                onLocationSelect={(lng, lat) => {
                  setLat(lat.toString());
                  setLng(lng.toString());
                  setSelectedLocation({ lng, lat });

                  fetchAddressFromCoords(lat, lng);
                }}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full mt-5" disabled={loading}>
              {loading ? "Creating..." : "Create user & shop"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
