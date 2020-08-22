import { NextApiRequest, NextApiResponse } from "next";

import * as rio from "@src/rio";

function findCharacter(name: string, realm: string, matches: rio.RaiderIO.Match[]): string | undefined {
  const lowName = name.toLowerCase();
  const lowRealm = realm.toLowerCase();

  const match = matches.find(
    (m) => m.name.toLowerCase() === lowName && m.data.realm.name.toLowerCase() === lowRealm
  );

  return match?.data.id;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, realm } = req.query;
  if (typeof name !== "string" || typeof realm !== "string") throw new Error("Invalid name or realm");

  const data = await rio.serach(name);

  const characterID = findCharacter(name, realm, data.matches);
  res.json({ characterID });
};
