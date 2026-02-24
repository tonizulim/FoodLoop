"use client";

import { Newspaper } from "lucide-react";
import { BlogSearchBar } from "@/components/BlogSearchBar";
import { Suspense } from "react";
import SearchBarLoadingSkeleton from "@/components/SearchBarLoadingSkeleton";
import AvailableFoodPickupsLoadingSkeleton from "@/components/AvailableFoodPickupsLoadingSkeleton";
import BlogPosts from "@/components/BlogPosts";

export default function BlogPage() {
  // optional callback for reset if needed
  const handleReset = () => {
    // any extra logic on reset
    console.log("Filters reset!");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30">
      {/* Header */}
      <section className="bg-linear-to-b from-primary/10 to-transparent border-b border-border">
        <div className="container mx-auto px-4 py-14 md:py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tips, stories, and updates about food sharing and sustainability
          </p>

          <Suspense fallback={<SearchBarLoadingSkeleton />}>
            <BlogSearchBar onReset={handleReset} />
          </Suspense>
        </div>
      </section>

      {/* BlogPosts */}
      <Suspense fallback={<AvailableFoodPickupsLoadingSkeleton />}>
        <BlogPosts />
      </Suspense>
    </div>
  );
}
