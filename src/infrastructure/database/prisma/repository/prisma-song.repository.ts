import { Injectable } from "@nestjs/common";
import { type Prisma, Song } from "@prisma/client";

import { SongRepository } from "@core";

import { PrismaService } from "../prisma.service";

// TODO ADD GENERIC EXCEPTION THROWS
@Injectable()
export class PrismaSongRepository implements SongRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public findAllPaginated(select: Prisma.SongSelectScalar, skip: number, take: number): Promise<Song[]> {
    return this.prismaService.song.findMany({
      select: {
        id: true,
        ...select,
      },
      skip: skip,
      take: take,
    });
  }
  public async findAllByArtistIdPaginated(
    select: Prisma.SongSelectScalar,
    artistId: number,
    skip: number,
    take: number,
  ): Promise<Song[]> {
    const songs = await this.prismaService.artist
      .findUnique({
        select: {},
        where: { id: artistId || undefined },
      })
      .songs({
        select: {
          id: true,
          ...select,
        },
        skip: skip,
        take: take,
      });
    return songs === null ? [] : songs;
  }
  public findById(select: Prisma.SongSelectScalar, id: number): Promise<Song> {
    return this.prismaService.song.findUniqueOrThrow({
      select: {
        id: true,
        ...select,
      },
      where: {
        id,
      },
    });
  }
  public create(createInput: Prisma.SongCreateInput): Promise<Song> {
    return this.prismaService.song.create({
      data: createInput,
    });
  }
  public update(id: number, updateInput: Prisma.SongUpdateInput): Promise<Song> {
    return this.prismaService.song.update({
      data: updateInput,
      where: {
        id,
      },
    });
  }
}
