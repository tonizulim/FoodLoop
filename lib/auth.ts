import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/auth-schema"; 

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        schema,
        provider: "pg",
    }),
    emailAndPassword: { 
        enabled: true,
        autoSignIn: false
  }, 
});