import { Injectable } from "@nestjs/common";
import { Artist, type Prisma } from "@prisma/client";

import { ArtistRepository } from "@core";

import { PrismaService } from "../prisma.service";

// TODO ADD GENERIC EXCEPTION THROWS
@Injectable()
export class PrismaArtistRepository implements ArtistRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public findAllPaginated(select: Prisma.ArtistSelectScalar, skip: number, take: number): Promise<Artist[]> {
    return this.prismaService.artist.findMany({
      select: {
        id: true,
        ...select,
      },
      skip: skip,
      take: take,
    });
  }
  public async findAllBySongIdPaginated(
    select: Prisma.ArtistSelectScalar,
    songId: number,
    skip: number,
    take: number,
  ): Promise<Artist[]> {
    const artists = await this.prismaService.song
      .findUnique({
        select: {},
        where: { id: songId || undefined },
      })
      .artists({
        select: {
          id: true,
          ...select,
        },
        skip: skip,
        take: take,
      });
    return artists === null ? [] : artists;
  }
  public findById(select: Prisma.ArtistSelectScalar, id: number): Promise<Artist> {
    return this.prismaService.artist.findUniqueOrThrow({
      select: {
        id: true,
        ...select,
      },
      where: {
        id,
      },
    });
  }
  public create(createInput: Prisma.ArtistCreateInput): Promise<Artist> {
    return this.prismaService.artist.create({
      data: createInput,
    });
  }
  public update(id: number, updateInput: Prisma.ArtistUpdateInput): Promise<Artist> {
    return this.prismaService.artist.update({
      data: updateInput,
      where: {
        id,
      },
    });
  }
}
