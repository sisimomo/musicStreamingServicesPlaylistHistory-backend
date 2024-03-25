import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { LoggerModule } from "@infrastructure";

import { HealthModule, ResolverModule } from "@resolver";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    LoggerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
    }),
    ResolverModule,
    HealthModule,
  ],
  controllers: [],
})
export class AppModule {}

// TODO ADD:
//  - Rate limiting
//  - Query complexity calculator
