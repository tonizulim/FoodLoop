import { Asset } from "contentful";
//import { LocationPoint } from "./Location";
import { Document } from "@contentful/rich-text-types";

export type Blog = {
  id: string;
  title: string;
  //imgUrl?: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
  //imgUrl?: Asset;
  imgUrl?: string;
  publishedDate: string;
  content: Document;
  //author: string;
};
