export namespace RaiderIO {
  export interface SearchResponse {
    matches: Match[];
  }

  export interface Match {
    type: string;
    name: string;
    data: MatchData;
  }

  export interface MatchData {
    id: string;
    name: string;
    realm: MatchDataRealm;
  }

  export interface MatchDataRealm {
    id: number;
    name: string;
  }

  export interface RunResponse {
    runs: Run[];
  }

  export interface Run {
    summary: RunSummary;
    score: number;
  }

  export interface RunSummary {
    keystone_run_id: number;
    mythic_level: number;
    time_remaining_ms: number;
    dungeon: RunSummaryDungeon;
  }

  export interface RunSummaryDungeon {
    name: string;
  }
}
