import { redirect } from "next/navigation";
import { getAllUsers, getRoleUser } from "@/lib/server-actions/user";
import SuperAdminClient from "./SuperAdminClient";

export default async function SuperAdminPage() {
  const user = await getRoleUser();


  if (!user || !user.isAdmin) {
    redirect("/");
  }

    const users = await getAllUsers();

  return <SuperAdminClient currentUser={user} users={users} />;
}
