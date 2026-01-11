import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/adminGuard";
import { getAllUsers } from "@/lib/adminActions";
import AdminClient from "@/app/admin/AdminClient";

export default async function AdminPage() {
  const admin = await requireAdmin();

  if (!admin) {
    redirect("/");
  }

  const users = await getAllUsers();

  return <AdminClient users={users} />;
}
