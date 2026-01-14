import { getServerSession } from "@/lib/auth-server"; 
import { db } from "@/db"; 
import { AppUser } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCurrentAppUser() {
  const session = await getServerSession();

  if (!session?.user?.id) return null;

  const [user] = await db
    .select()
    .from(AppUser)
    .where(eq(AppUser.authUserId, session.user.id));

  return user ?? null;
}
