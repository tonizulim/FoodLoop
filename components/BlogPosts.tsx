"use client";

import { useQueryState, parseAsString } from "nuqs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Calendar } from "lucide-react";
import Link from "next/link";
import { Pagination } from "@/components/Pagination";
import { notFound } from "next/navigation";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || "6", 10);

export default function BlogPosts() {
  const [searchQuery] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  const { blogs, blogsCount, loading, page } = useBlogPosts();

  const totalPages = Math.max(1, Math.ceil(blogsCount / PAGE_SIZE));

  if (parseInt(page) > totalPages) notFound();

  return (
    <>
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
                <div className="aspect-16/10 overflow-hidden mx-5">
                  <div className="relative w-full h-64">
                    <Image
                      fill
                      src={
                        blog.imgUrl ? blog.imgUrl : "/../../public/itemImg.png"
                      }
                      alt={blog.title}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
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
                      className="w-full bg-transparent hover:bg-muted"
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
      <div className="flex justify-center">
        <Pagination currentPage={parseInt(page)} totalPages={totalPages} />
      </div>
    </>
  );
}
