ALTER TABLE "random_maps" ALTER COLUMN "datetime" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "random_maps" ALTER COLUMN "datetime" SET NOT NULL;