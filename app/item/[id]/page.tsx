"use Client";
import ItemPageContent from "@/components/ItemPageContent";
import { ItemPageProps } from "@/types/ItemPageProps";

export default async function ItemPage({ params }: ItemPageProps) {
  const itemId = Number(params.id);

  return <ItemPageContent id={itemId} />;
}
