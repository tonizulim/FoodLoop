import { getCurrentAppUser } from "@/lib/getCurrentUser";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "@/types/roles";

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
