import { supabaseClient } from "./supabase/server";

export async function logError(error: any) {
  try {
    await supabaseClient.from("Log").insert([
      {
        message: error?.message ?? "Unknown error",
        details: error?.details ?? null,
        code: error?.code ?? null,
        time: new Date().toISOString(),
      },
    ]);
  } catch (logErr) {
    console.error("Failed to write log:", logErr);
  }
}
