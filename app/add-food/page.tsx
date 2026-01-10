import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth-server";
import AddFoodClient from "./AddFoodClient";

export default async function AddFoodPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return <AddFoodClient />;
}
