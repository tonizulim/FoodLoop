import { getCurrentAppUser } from "@/lib/getCurrentUser";
import { ROLE_SUPER_ADMIN } from "@/types/roles";

export async function isSuperAdmin() {
  const user = await getCurrentAppUser();

  if (!user || user.role_id !== ROLE_SUPER_ADMIN) {
    return false;
  }

  return true;
}
