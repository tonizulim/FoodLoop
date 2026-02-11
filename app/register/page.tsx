import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/middleware/isAdmin";
import Register from "./RegisterPage";

export default async function AdminPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }

  return <Register />;
}
