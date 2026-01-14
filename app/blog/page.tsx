"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Newspaper, Calendar, User, Search } from "lucide-react";
import { Blog } from "@/types/Blog";
import { useBlogPosts } from "@/hooks/useBlogPosts";

export default function BlogPage() {
  const { loading, blogs } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-secondary/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Blog</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Tips, stories, and updates about food sharing and sustainability
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No blog posts match your search"
                  : "No blog posts yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog: Blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* {blog.image && (
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )} */}
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{blog.category}</Badge>
                      </div> */}
                      <div>
                        <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                          {blog.id}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {/* {post.excerpt} */}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                    </div>
                  </div>

                  <Button variant="outline" className="mt-4 bg-transparent">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
