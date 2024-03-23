import { Injectable } from "@nestjs/common";
import { Artist, type Prisma } from "@prisma/client";

import { ArtistRepository } from "@core";

import { PrismaService } from "../prisma.service";

// TODO ADD GENERIC EXCEPTION THROWS
@Injectable()
export class PrismaArtistRepository implements ArtistRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public findAllWithPagination(skip: number, take: number): Promise<Artist[]> {
    return this.prismaService.artist.findMany({
      skip: skip,
      take: take,
    });
  }
  public findById(id: number): Promise<Artist> {
    return this.prismaService.artist.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  public create(entity: Prisma.ArtistCreateInput): Promise<Artist> {
    return this.prismaService.artist.create({
      data: entity,
    });
  }
  public update(id: number, entity: Prisma.ArtistUpdateInput): Promise<Artist> {
    return this.prismaService.artist.update({
      data: entity,
      where: {
        id,
      },
    });
  }
}
