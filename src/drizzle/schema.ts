import { pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

import { createEnumObject } from "@src/drizzle/drizzle.utils";

const StreamingService = ["apple_music", "spotify"] as const;
export const StreamingServiceEnum = createEnumObject(StreamingService);
export const streamingServiceEnum = pgEnum("streaming_service", StreamingService);

export const artist = pgTable("artist", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url", { length: 2048 }),
  artworkUrl: varchar("artwork_url", { length: 2048 }),
  streamingService: streamingServiceEnum("streaming_service").notNull(),
  streamingServiceInternalId: text("streaming_service_internal_id").notNull(),
});

export type Artist = typeof artist.$inferSelect;
