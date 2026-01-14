import { Asset } from "contentful";
import { LocationPoint } from "./Location";

export type Blog = {
  id: string;
  label: string;
  imgUrl?: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
};
