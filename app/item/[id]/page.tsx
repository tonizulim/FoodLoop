import ItemPageContent from "@/components/ItemPageContent";
import { ItemPageProps } from "@/types/ItemPageProps";

// export default async function ItemPage({ params }: ItemPageProps) {
//   const itemId = Number(params.id);

export default async function ItemPage({ params }: ItemPageProps) {
  return <ItemPageContent id={1} />;
}
