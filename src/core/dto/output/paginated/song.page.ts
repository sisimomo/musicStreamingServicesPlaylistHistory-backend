import { ObjectType } from "@nestjs/graphql";

import { Song } from "../song";
import { Page } from "./page";

@ObjectType(SongPage.name)
export class SongPage extends Page(() => Song) {}
