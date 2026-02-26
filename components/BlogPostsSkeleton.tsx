"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function BlogPostsSkeleton() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse mx-5 mt-5 rounded-md" />

            <CardContent className="p-5 space-y-3">
              <div className="h-3 w-1/3 bg-gray-200 animate-pulse rounded" />
              <div className="h-3 w-1/4 bg-gray-200 animate-pulse rounded" />
              <div className="h-5 w-3/4 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded" />
              <div className="h-8 w-full bg-gray-200 animate-pulse rounded mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}