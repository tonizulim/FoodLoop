import { EntryFieldTypes, EntrySkeletonType } from "contentful";

export interface TypeBlogFields {
  title: EntryFieldTypes.Symbol;
  publishedDate: EntryFieldTypes.Date;
  heroImage: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
  //author: EntryFieldTypes.EntryLink;
}

export type TypeBlogSkeleton = EntrySkeletonType<TypeBlogFields, "blogPost">;
