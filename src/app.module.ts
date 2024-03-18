import { DrizzlePGModule } from "@knaadh/nestjs-drizzle-pg";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import * as schema from "@src/drizzle/schema";

import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";

import { ArtistModule } from "@context/artist/artist.module";
import { ArtistRepository } from "@context/artist/artist.repository";
import { ArtistResolver } from "@context/artist/artist.resolver";

@Module({
  imports: [
    DrizzlePGModule.register({
      tag: "db",
      pg: {
        connection: "client",
        config: {}, // A Client instance will use environment variables for all missing values.
      },
      config: { schema: { ...schema } },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
    }),
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    ArtistModule,
  ],
  providers: [ArtistResolver, ArtistRepository],
})
export class AppModule {}
