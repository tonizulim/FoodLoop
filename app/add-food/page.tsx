"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { useFoodForm } from "@/hooks/useNewItem";
import { useState } from "react";

export default function AddFoodPage() {
  const { item, setItem, handleSubmit, foodFormState } = useFoodForm();

  const [hours, setHours] = useState<number>(2);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Share Your Food
          </h1>
          <p className="text-muted-foreground">
            Help reduce waste by sharing surplus food with your community
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Food Listing</CardTitle>
            <CardDescription>
              Fill in the details about the food you want to share
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {foodFormState.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{foodFormState.error}</AlertDescription>
                </Alert>
              )}

              {foodFormState.success && (
                <Alert className="border-primary bg-primary/10">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">
                    Food listing posted successfully! Redirecting...
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Food Title *</Label>
                {foodFormState.error && foodFormState.fieldErrors.title && (
                  <Alert variant="destructive" className="p-2 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <AlertDescription className="text-xs">
                      {foodFormState.fieldErrors["title"]}
                    </AlertDescription>
                  </Alert>
                )}
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Fresh Vegetables, Homemade Bread"
                  value={item.title}
                  onChange={(e) =>
                    setItem((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                {foodFormState.error &&
                  foodFormState.fieldErrors["description"] && (
                    <Alert variant="destructive" className="p-2 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <AlertDescription className="text-xs">
                        {foodFormState.fieldErrors["description"]}
                      </AlertDescription>
                    </Alert>
                  )}
                <Textarea
                  id="description"
                  placeholder="Describe the food, quantity, and any special instructions..."
                  value={item.description}
                  onChange={(e) =>
                    setItem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expires_at">Available For (hours) *</Label>
                {foodFormState.error &&
                  foodFormState.fieldErrors["expires_at"] && (
                    <Alert variant="destructive" className="p-2 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <AlertDescription className="text-xs">
                        {foodFormState.fieldErrors["expires_at"]}
                      </AlertDescription>
                    </Alert>
                  )}
                <Input
                  id="expires_at"
                  type="number"
                  value={hours}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const hours = Number(e.target.value);
                    setItem((prev) => ({
                      ...prev,
                      expires_at: new Date(
                        Date.now() + hours * 60 * 60 * 1000
                      ).toISOString(),
                    }));
                    setHours(hours);
                  }}
                />
                <p className="text-sm text-muted-foreground">
                  How long will this food be available for pickup?
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={foodFormState.loading || foodFormState.success}
              >
                {foodFormState.loading ? "Posting..." : "Post Food Listing"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
