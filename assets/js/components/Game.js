import React, { Component } from "react";

export default class Game extends Component {
  constructor(props) {
    super(props);
  }


  // TODO: Render the participants into a list or something like that
  render() {
    let game = this.props.game.game;

    return(
      <div>
        <ul className="summoners-container">
          {game.participants.map(x => {
            if (x.teamId == 100) {
              return <li key={x.summonerName}> {x.summonerName} </li>
            }
          })}
          <hr />
          {game.participants.map(x => {
            if (x.teamId == 200) {
              return <li key={x.summonerName}> {x.summonerName} </li>
            }
          })}
        </ul>
      </div>
    )
  }
}
