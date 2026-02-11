import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/middleware/isAdmin";
import EditUserPage from "./User";

export default async function UserPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }

  return <EditUserPage />;
}
