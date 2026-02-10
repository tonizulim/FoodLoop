import cms from "@/cms";
import { TypeBlogSkeleton } from "@/cms/content-types";
import { Blog } from "@/types/Blog";
import { it } from "zod/v4/locales";

export async function getBlogs(): Promise<Blog[]> {
  const data = await cms.withoutUnresolvableLinks.getEntries<TypeBlogSkeleton>({
    content_type: "blogPost",
    select: [
      "fields.title",
      "fields.heroImage",
      "fields.publishedDate",
      "sys.id",
      "fields.content",
    ],
  });

  return data.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    content: item.fields.content,
    //author: item.fields.author,
    //imgUrl: item.fields.heroImage,
    //publishedDate: item.fields.publishedDate,
    imgUrl: item?.fields?.heroImage?.fields?.file?.url
      ? `https:${item.fields.heroImage.fields.file.url}`
      : undefined, // fallback to undefined or "/placeholder.jpg"
    publishedDate: item.fields.publishedDate
      ? new Date(item.fields.publishedDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "N/A",
  }));
}

export async function getBlogById(blogId: string): Promise<Blog | null> {
  try {
    // const data = await cms.withoutUnresolvableLinks.getEntry<TypeBlogSkeleton>(blogId, {
    //   select: ["fields.title", "fields.heroImage", "fields.publishedDate", "sys.id"],
    // });
    const data = await cms.withoutUnresolvableLinks.getEntry<TypeBlogSkeleton>(
      blogId
    );

    //   const data = await cms.withoutUnresolvableLinks.getEntries<TypeBlogSkeleton>({
    //   content_type: "blogPost",
    //   select: [
    //     "fields.title",
    //     "fields.heroImage",
    //     "fields.publishedDate",
    //     "sys.id",
    //   ],
    // });

    if (!data) return null;

    return {
      id: data.sys.id,
      title: data.fields.title,
      content: data.fields.content,
      //author: data.fields.author,
      imgUrl: data.fields.heroImage?.fields?.file?.url
        ? `https:${data.fields.heroImage.fields.file.url}`
        : undefined, // fallback can be "/placeholder.jpg"
      publishedDate: data.fields.publishedDate
        ? new Date(data.fields.publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A",
    };
  } catch (err) {
    console.error("Error fetching blog:", err);
    return null;
  }
}
