import { getCurrentAppUser } from "@/lib/getCurrentUser";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "@/types/roles";

export async function isAdmin() {
  const user = await getCurrentAppUser();

  if (!user) {
    return false;
  }

  if (
    user.role_id !== ROLE_ADMIN &&
    user.role_id !== ROLE_SUPER_ADMIN
  ) {
    return false;
  }

  if (!user.approved) {
    return false;
  }

  return true;
}