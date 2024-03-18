DO $$ BEGIN
 CREATE TYPE "streaming_service" AS ENUM('apple_music', 'spotify');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artist" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"url" varchar(2048),
	"artwork_url" varchar(2048),
	"streaming_service" "streaming_service" NOT NULL,
	"streaming_service_internal_id" text NOT NULL
);
