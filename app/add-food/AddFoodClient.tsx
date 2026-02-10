"use client";

import { useState } from "react";
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
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useFoodForm } from "@/hooks/useNewItem";
import { useFoodCategory } from "@/hooks/useFoodCategory";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddFoodClient() {
  const { item, setItem, handleSubmit, foodFormState } = useFoodForm();
  const foodCategory = useFoodCategory();
  const [hours, setHours] = useState<number>(2);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Share Your Food
          </h1>
          <p className="text-muted-foreground">Help reduce waste by sharing surplus food</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Food Listing</CardTitle>
            <CardDescription>Fill in the details about the food</CardDescription>
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
                    Food listing posted successfully!
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label>Food title *</Label>
                <Input
                  value={item.title}
                  onChange={(e) => setItem((p) => ({ ...p, title: e.target.value }))}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  rows={4}
                  value={item.description}
                  onChange={(e) => setItem((p) => ({ ...p, description: e.target.value }))}
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Available (hours)</Label>
                  <Input
                    type="number"
                    value={hours}
                    onChange={(e) => {
                      const h = Number(e.target.value);
                      setHours(h);
                      setItem((p) => ({
                        ...p,
                        expires_at: new Date(Date.now() + h * 3600_000).toISOString(),
                      }));
                    }}
                  />
                </div>

                <div className="flex-1">
                  <Label>Category *</Label>
                  <Select
                    value={item.food_id?.toString() ?? ""}
                    onValueChange={(v) => setItem((p) => ({ ...p, food_id: Number(v) }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {foodCategory.foodCategory.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={foodFormState.loading}>
                {foodFormState.loading ? "Posting..." : "Post food"}
              </Button>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
