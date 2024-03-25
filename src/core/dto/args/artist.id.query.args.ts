import { ArgsType } from "@nestjs/graphql";

import { Artist } from "../output/artist";
import { BaseIdQueryArgs } from "./id.query.args";

@ArgsType()
export class ArtistIdQueryArgs extends BaseIdQueryArgs(Artist) {}
