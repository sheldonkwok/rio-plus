import React from "react";

import * as types from "@src/api/types";
import { DUNGEONS } from "@src/consts";

import CharacterIDFinder from "./character-id";

interface IProps {
  mainKeysRun: Set<number>;
}

interface IState {
  characterID: string;
  sharedRuns: number;
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { characterID: "", sharedRuns: 0 };
  }

  async fetchStats(characterID: string): Promise<void> {
    this.setState({ characterID, sharedRuns: 0 });

    for (const id of DUNGEONS) {
      const res = await fetch(`/api/character/${characterID}/runs?dungeonID=${id}`);
      const data: types.RunsResponse = await res.json();

      for (const run of data.runs) {
        if (!this.props.mainKeysRun.has(run.id)) continue;

        this.setState({ sharedRuns: this.state.sharedRuns + 1 });
      }
    }
  }

  render() {
    return (
      <div>
        <CharacterIDFinder emitCharacterID={this.fetchStats.bind(this)}></CharacterIDFinder>
        <div>Shared Runs: {this.state.sharedRuns}</div>
      </div>
    );
  }
}
