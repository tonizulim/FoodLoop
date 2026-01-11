import cms from "@/cms";
import { TypeBlogSkeleton } from "@/cms/content-types";
import { Blog } from "@/types/Blog";

export async function getBlogs(): Promise<Blog[]> {
  console.log("pozvan");
  const data = await cms.withoutUnresolvableLinks.getEntries<TypeBlogSkeleton>({
    content_type: "blogPost",
    select: ["fields.title", "fields.heroImage", "sys.id"],
  });

  console.log(data.items);

  return data.items.map((item) => ({
    id: item.sys.id,
    label: item.fields.title,
    imgUrl: item.fields.heroImage,
  }));
}
