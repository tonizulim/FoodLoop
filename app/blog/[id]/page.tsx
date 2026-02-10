"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, UserRound } from "lucide-react";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Blog } from "@/types/Blog";
import { getBlogById } from "@/lib/server-actions/blog";
import { useBlogPostById } from "@/hooks/useBlogPostById";
import Image from "next/image";

export default function BlogPostPage() {
  const params = useParams();
  const { loading, blog } = useBlogPostById(params.id as string);

  //   useEffect(() => {
  //     if (params.id) {
  //       const found = getBlogById(params.id as string);
  //       setPost(found);
  //     }
  //     setLoading(false);
  //   }, [params.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Blog post not found.</p>
        <Link href="/blog">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Image */}
      <div className="w-full aspect-21/9 md:aspect-3/1 overflow-hidden bg-muted relative">
        {/* <img
          src={blog.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover"
        /> */}
        <Image
          src={blog.imgUrl ? blog.imgUrl : "/../../public/itemImg.png"}
          alt={blog.title}
          className="object-cover"
          width={800} // normalize width server-side
          height={800} // normalize height server-side
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 max-w-3xl -mt-16 relative z-10">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="outline" size="sm" className="mb-6 gap-2 bg-card">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-balance mb-4">
          {blog.title}
        </h1>
        {/* Meta */}
        <div className="flex items-center gap-5 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          {/* <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span>{blog.author}</span>
          </div> */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{blog?.publishedDate}</span>
          </div>
        </div>
        {/* Body */}
        <div>{documentToReactComponents(blog.content)}</div>
      </article>
    </div>
  );
}
