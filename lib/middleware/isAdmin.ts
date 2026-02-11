import { getCurrentAppUser } from "@/lib/getCurrentUser";

export async function isAdmin() {
  const user = await getCurrentAppUser();

  if (!user) {
    return false;
  }

  if (user.isAdmin !== true) {
    return false;
  }
  return true;
}
