ALTER TABLE "random_maps" DROP CONSTRAINT "random_maps_mapId_maps_id_fk";
--> statement-breakpoint
ALTER TABLE "random_maps" ALTER COLUMN "mapId" DROP NOT NULL;