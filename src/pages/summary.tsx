import React from "react";

import * as types from "@src/api/types";

interface IProps {
  characterID: string;
}

interface IState {
  dungeons: types.RunsResponse[];
}

const DUNGEONS = [9028, 800002, 9424, 800001, 9327, 9164, 9526, 9527, 9391, 8064, 9354, 9525];

export default class extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { dungeons: [] };
  }

  async componentDidMount() {
    // We load these sequentially to limit concurrent API calls
    for (const id of DUNGEONS) {
      const res = await fetch(`/api/character/${this.props.characterID}/runs?dungeonID=${id}`);
      const data: types.RunsResponse = await res.json();

      this.setState({ dungeons: this.state.dungeons.concat(data) });
    }
  }

  render() {
    return (
      <div>
        {this.state.dungeons.map((d) => (
          <div>
            {d.name} {JSON.stringify(d.summary)}
          </div>
        ))}
      </div>
    );
  }
}
