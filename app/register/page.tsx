import { redirect } from "next/navigation";
import { getAllUsers } from "@/lib/server-actions/user";
import AdminClient from "@/app/admin/AdminClient";
import { isAdmin } from "@/lib/middleware/isAdmin";

export default async function AdminPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }

  const users = await getAllUsers();

  return <AdminClient users={users} />;
}
