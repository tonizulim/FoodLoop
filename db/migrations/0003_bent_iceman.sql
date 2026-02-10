ALTER TABLE "Role" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "Role" CASCADE;--> statement-breakpoint
ALTER TABLE "app_user" DROP CONSTRAINT "app_user_role_id_Role_id_fk";
--> statement-breakpoint
ALTER TABLE "app_user" ADD COLUMN "isAdmin" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "app_user" DROP COLUMN "role_id";