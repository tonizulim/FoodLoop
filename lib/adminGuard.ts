import { supabaseClient } from "@/lib/supabase/server";
import { getSessionUser } from "@/lib/auth-session";

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) return null;

  const { data, error } = await supabaseClient
    .from("app_user")
    .select("role_id")
    .eq("auth_user_id", user.id)
    .single();

  if (error || !data) return null;

  if (data.role_id !== 2) return null;

  return user;
}
