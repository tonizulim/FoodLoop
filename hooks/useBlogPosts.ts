"use client";

import { getBlogs } from "@/lib/server-actions/blog";
import { Blog } from "@/types/Blog";
import { Listing } from "@/types/Listing";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useBlogPosts() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  async function fetchBlogs() {
    setLoading(true);
    try {
      const res = await getBlogs();
      console.log(res);
      if (res) {
        setBlogs(res || []);
      }
      setLoading(false);
      return;
    } catch (err) {}

    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return {
    loading,
    blogs,
  };
}
