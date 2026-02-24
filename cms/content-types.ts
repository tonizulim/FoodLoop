import { EntryFieldTypes, EntrySkeletonType } from "contentful";

export interface TypeBlogFields {
  title: EntryFieldTypes.Symbol;
  publishedDate: EntryFieldTypes.Date;
  heroImage: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
  authorEmail: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
}

export type TypeBlogSkeleton = EntrySkeletonType<TypeBlogFields, "blogPost">;
