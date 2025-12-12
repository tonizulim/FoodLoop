"use server";

import { supabaseClient } from "../supabase/server";


export async function login(email: string, password: string) {

  if (!email || !password) {
    return { error: "Email i šifra su obavezni." };
  }

  const { data: user, error } = await supabaseClient
    .from("User")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error) {
    return { error: "Neispravni podaci." };
  }

  if (!user) {
    return { error: "Email ili lozinka nisu ispravni." };
  }

  return { success: true, user };
}
