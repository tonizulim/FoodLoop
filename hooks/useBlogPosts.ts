"use client";

import {
  getBlogPosts,
  getBlogs,
  getBlogsCount,
} from "@/lib/server-actions/blog";
import { Blog } from "@/types/Blog";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = parseInt(process.env.PAGE_SIZE || "6", 10);

export function useBlogPosts() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  const page = searchParams.get("page") ?? "1";

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogsCount, setBlogsCount] = useState(1);

  async function fetchBlogs() {
    setLoading(true);
    try {
      //const res = await getBlogPosts(parseInt(page), PAGE_SIZE, searchQuery);
      const [res, blogsCount] = await Promise.all([
        getBlogPosts(parseInt(page), PAGE_SIZE, searchQuery),
        getBlogsCount(searchQuery),
      ]);
      if (res) {
        setBlogs(res || []);
        setBlogsCount(blogsCount);
      }
      setLoading(false);
      return;
    } catch (err) {}

    setLoading(false);
  }

  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, page]);

  return {
    loading,
    blogs,
    blogsCount,
    page,
  };
}
