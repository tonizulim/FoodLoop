CREATE TABLE "Food" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Food_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"type" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Item" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"shop_id" integer NOT NULL,
	"food_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"image" varchar(500),
	"published_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Log" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Log_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"code" varchar(50),
	"message" varchar(255) NOT NULL,
	"details" text,
	"hint" text,
	"time" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Role" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Role_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"role" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Shop" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "Shop_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"location" "point" NOT NULL,
	"address" varchar(200) NOT NULL,
	"image" varchar(500),
	"admin_id" integer NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "User_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"salt" varchar(255) NOT NULL,
	"refresh_token" varchar(500),
	"approved" boolean DEFAULT false NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Item" ADD CONSTRAINT "Item_shop_id_Shop_id_fk" FOREIGN KEY ("shop_id") REFERENCES "public"."Shop"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Item" ADD CONSTRAINT "Item_food_id_Food_id_fk" FOREIGN KEY ("food_id") REFERENCES "public"."Food"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_admin_id_User_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_Role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."Role"("id") ON DELETE no action ON UPDATE no action;