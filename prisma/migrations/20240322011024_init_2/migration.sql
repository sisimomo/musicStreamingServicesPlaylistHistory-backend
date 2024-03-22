/*
  Warnings:

  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Artist";

-- CreateTable
CREATE TABLE "artist" (
    "id" SERIAL NOT NULL,
    "streaming_service" "streaming_service" NOT NULL,
    "streaming_service_internal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(256) NOT NULL,
    "url" VARCHAR(2048),
    "artwork_url" VARCHAR(2048),

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);
