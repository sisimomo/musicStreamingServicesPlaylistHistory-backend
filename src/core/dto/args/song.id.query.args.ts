import { ArgsType } from "@nestjs/graphql";

import { Song } from "../output/song";
import { BaseIdQueryArgs } from "./id.query.args";

@ArgsType()
export class SongIdQueryArgs extends BaseIdQueryArgs(Song) {}
