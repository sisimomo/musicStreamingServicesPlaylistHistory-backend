-- CreateEnum
CREATE TYPE "streaming_service" AS ENUM ('APPLE_MUSIC', 'SPOTIFY');

-- CreateTable
CREATE TABLE "Artist" (
    "id" SERIAL NOT NULL,
    "streaming_service" "streaming_service" NOT NULL,
    "streaming_service_internal_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(256) NOT NULL,
    "url" VARCHAR(2048),
    "artwork_url" VARCHAR(2048),

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);
