import React from "react";

import * as types from "@src/api/types";
import { DUNGEONS } from "@src/consts";

import SharedKeys from "./shared-keys";

interface IProps {
  characterID: string;
}

interface IState {
  dungeons: types.RunsResponse[];
  keysRun: Set<number>;
  finished: boolean;
}

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { dungeons: [], keysRun: new Set(), finished: false };
  }

  async componentDidMount() {
    // We load these sequentially to limit concurrent API calls
    for (const id of DUNGEONS) {
      const res = await fetch(`/api/character/${this.props.characterID}/runs?dungeonID=${id}`);
      const data: types.RunsResponse = await res.json();

      const newKeysRun = data.runs.reduce((agg, curr) => agg.add(curr.id), this.state.keysRun);
      this.setState({
        dungeons: this.state.dungeons.concat(data),
        keysRun: newKeysRun,
      });
    }

    this.setState({ finished: true });
  }

  render() {
    return (
      <div>
        {this.state.dungeons.map((d) => (
          <div key={d.name}>
            {d.name} {JSON.stringify(d.summary)}
          </div>
        ))}

        {this.state.finished ? (
          <div>
            <h4>Shared Keys</h4>
            <SharedKeys mainKeysRun={this.state.keysRun}></SharedKeys>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
