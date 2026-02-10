"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
import Link from "next/link";

export default function BlogPage() {
  const { loading, blogs } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");

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
      </section>

      {/* Posts Grid */}
      <section className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading blog posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No blog posts yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {/* Blog Image */}
                <div className="aspect-16/10 overflow-hidden bg-muted">
                  <Image
                    src={
                      blog.imgUrl ? blog.imgUrl : "/../../public/itemImg.png"
                    }
                    alt={blog.title}
                    className="object-cover"
                    width={800} // normalize width server-side
                    height={800} // normalize height server-side
                  />
                </div>

                <CardContent className="flex flex-col flex-1 p-5">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{blog.publishedDate}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-5 flex-1">
                    {/* {blog.excerpt} */}
                  </p>

                  {/* Read More */}
                  <Link href={`/blog/${blog.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
{
  /*
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
                {blog.imgUrl && (
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={blog.imgUrl || "/placeholder.svg"}
                      //alt={blog.imgUrl.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="relative w-full h-64 bg-gray-100">
                  <Image
                    fill
                    src={
                      blog.imgUrl
                        ? blog.imgUrl
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Mvv1BeeUfTSbTviu90M8gj-uB0gZ27R_Lg&s"
                    }
                    alt="tets"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{blog.category}</Badge>
                      </div> */
}
{
  /*
                      <div>
                        <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                          {blog.id}
                          {blog.label}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {/* {post.excerpt} */
}
{
  /*
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
*/
}
