import React from "react";

import CharacterIDFinder from "./character-id";
import Summary from "./summary";

interface IProps {}

interface IState {
  characterID?: string;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { characterID: "" };
  }

  setCharacterID(characterID: string): void {
    this.setState({ characterID });
  }

  render() {
    if (this.state.characterID) {
      return (
        <div>
          <div>{this.state.characterID}</div>
          <Summary characterID={this.state.characterID}></Summary>
        </div>
      );
    }

    return <CharacterIDFinder emitCharacterID={this.setCharacterID.bind(this)}></CharacterIDFinder>;
  }
}
