ALTER TABLE "Log" ALTER COLUMN "code" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "Log" ALTER COLUMN "message" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "Log" ALTER COLUMN "message" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Log" ADD COLUMN "details" text;--> statement-breakpoint
ALTER TABLE "Log" ADD COLUMN "hint" text;--> statement-breakpoint
ALTER TABLE "Log" DROP COLUMN "error";