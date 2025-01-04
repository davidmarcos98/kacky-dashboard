DO $$ BEGIN
 CREATE TYPE "public"."medal" AS ENUM('at', 'gold');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "random_maps" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "random_maps_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"mapId" integer NOT NULL,
	"player" varchar(255) NOT NULL,
	"datetime" timestamp,
	"medal" "medal",
	"timeSpent" integer,
	"mapper" text,
	"styles" text,
	"skipType" text,
	"atTime" integer,
	"finalTime" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "random_maps" ADD CONSTRAINT "random_maps_mapId_maps_id_fk" FOREIGN KEY ("mapId") REFERENCES "public"."maps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
