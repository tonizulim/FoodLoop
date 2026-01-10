import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession() {
  const h = await headers();

  return auth.api.getSession({
    headers: Object.fromEntries(h.entries()),
  });
}
