"use client";

import { getBlogById, getBlogs } from "@/lib/server-actions/blog";
import { Blog } from "@/types/Blog";
import { useEffect, useState } from "react";

export function useBlogPostById(id: string) {
  // const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<Blog | null>();

  async function fetchBlog() {
    setLoading(true);
    try {
      const res = await getBlogById(id);
      if (res) {
        setBlog(res || null);
      }
      setLoading(false);
      return;
    } catch (err) {}

    setLoading(false);
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  return {
    loading,
    blog,
  };
}
