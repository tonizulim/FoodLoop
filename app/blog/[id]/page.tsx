"use client";

import { useParams } from "next/navigation";
import { useBlogPostById } from "@/hooks/useBlogPostById";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 1. Move options outside to keep the component clean
const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="font-bold text-foreground">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: React.ReactNode) => (
      <em className="italic">{text}</em>
    ),
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-semibold mb-3 mt-6">{children}</h2>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-lg text-muted-foreground bg-muted/20 py-2">
        {children}
      </blockquote>
    ),
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const { loading, blog } = useBlogPostById(params.id as string);

  if (loading)
    return <div className="flex justify-center p-20">Loading...</div>;
  if (!blog) return <div className="text-center p-20">Post not found.</div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Image */}

      <div className="w-full aspect-[21/9] md:aspect-[3/1] overflow-hidden bg-muted relative">
        <Image
          src={blog.imgUrl || "/itemImg.png"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 max-w-3xl -mt-16 relative z-10">
        {/* Back Button */}
        <Link href="/blog">
          <Button
            variant="outline"
            size="sm"
            className="mb-6 gap-2 bg-card hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight text-balance mb-4 mt-4">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-10 border-b pb-6">
          <Calendar className="h-4 w-4" />
          <span>{blog.publishedDate}</span>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {blog.content &&
            documentToReactComponents(blog.content, richTextOptions)}
        </div>
      </article>
    </div>
  );
}
