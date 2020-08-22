import { NextApiRequest, NextApiResponse } from "next";

import * as rio from "@src/rio";
import * as types from "@src/api/types";

function parseRuns(runs: rio.RaiderIO.Run[]): types.Run[] {
  return runs.map((r) => {
    const summary = r.summary;

    return {
      id: summary.keystone_run_id,
      level: summary.mythic_level,
      passed: summary.time_remaining_ms > 0,
    };
  });
}

function summarizeRuns(runs: types.Run[]): types.Summary {
  return runs.reduce(
    (agg, curr) => {
      if (curr.passed) agg.numPassed++;
      else agg.numFailed++;
      return agg;
    },
    { numPassed: 0, numFailed: 0, numCompleted: runs.length }
  );
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const q = req.query;
  const characterID = parseInt(q.id as string, 10);
  const dungeonID = parseInt(q.dungeonID as string);

  if (!dungeonID) throw new Error("Invalid dungeon id");

  const data = await rio.getRuns({ season: "season-bfa-4", characterID, dungeonID });
  const runs = parseRuns(data.runs);
  const summary = summarizeRuns(runs);
  const name = data.runs[0]?.summary.dungeon.name;

  res.json({ name, runs, summary });
};
