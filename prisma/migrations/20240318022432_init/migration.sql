-- CreateEnum
CREATE TYPE "streaming_service" AS ENUM ('APPLE_MUSIC', 'SPOTIFY');

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "url" VARCHAR(2048),
    "artwork_url" VARCHAR(2048),
    "streaming_service" "streaming_service" NOT NULL,
    "streaming_service_internal_id" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);
