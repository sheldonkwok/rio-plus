import * as https from "https";
import * as qs from "querystring";
import got from "got";

import { RaiderIO } from "./types";

const AGENT = new https.Agent({ maxSockets: 3 });
const CLIENT = got.extend({
  prefixUrl: "https://raider.io",
  agent: { https: AGENT },
  responseType: "json",
});

export async function serach(terms: string): Promise<RaiderIO.SearchResponse> {
  const data = await CLIENT.get<RaiderIO.SearchResponse>(`api/search?term=${terms}`);

  return data.body;
}

export interface GetRunsParams {
  season: string;
  characterID: number;
  dungeonID: number;
}

export async function getRuns({
  season,
  characterID,
  dungeonID,
}: GetRunsParams): Promise<RaiderIO.RunResponse> {
  const query = qs.stringify({
    season,
    characterId: characterID,
    dungeonId: dungeonID,
    role: "all",
    mode: "scored",
    affixes: "all",
    date: "all",
  });

  const data = await CLIENT.get<RaiderIO.RunResponse>(`api/characters/mythic-plus-runs?${query}`);
  return data.body;
}
