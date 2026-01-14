"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { AppUser } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "@/types/roles";
import { supabaseClient } from "../supabase/server";

export async function getRoleUser() {
  const h = await headers();

  const session = await auth.api.getSession({
    headers: Object.fromEntries(h.entries()),
  });

  if (!session) return null;

  const [user] = await db
    .select({
      id: AppUser.id,
      email: AppUser.email,
      role_id: AppUser.role_id,
      approved: AppUser.approved,
    })
    .from(AppUser)
    .where(eq(AppUser.authUserId, session.user.id));

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    role_id: user.role_id,
    approved: user.approved,
    isAdmin:
      user.role_id === ROLE_ADMIN ||
      user.role_id === ROLE_SUPER_ADMIN,
    isSuperAdmin: user.role_id === ROLE_SUPER_ADMIN,
  };
}

export type User = {
  id: string;
  email: string;
  approved: boolean;
  isAdmin: boolean;
};

export async function getAllUsers() {
  const { data } = await supabaseClient
    .from("app_user")
    .select("id, email, approved, role_id");

  return (
    data?.map((u) => ({
      id: u.id,
      email: u.email,
      approved: u.approved,
      isAdmin: u.role_id === 2,
    })) ?? []
  );
}


export async function approveUser(userId: string) {
  await db
    .update(AppUser)
    .set({ approved: true })
    .where(eq(AppUser.id, Number(userId)));
}

export async function deleteUser(userId: string) {
  await db.delete(AppUser).where(eq(AppUser.id, Number(userId)));
}

export async function promoteUserToAdmin(userId: string) {
  await db
    .update(AppUser)
    .set({ role_id: ROLE_ADMIN })
    .where(eq(AppUser.id, Number(userId)));
}

export async function revokeApproval(userId: string) {
  await db
    .update(AppUser)
    .set({ approved: false })
    .where(eq(AppUser.id, Number(userId)));
}