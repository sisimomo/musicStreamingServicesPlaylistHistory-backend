import { ObjectType } from "@nestjs/graphql";

import { Artist } from "../artist";
import { Page } from "./page";

@ObjectType()
export class ArtistPage extends Page(() => Artist) {}
