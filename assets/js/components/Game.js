import React, { Component } from "react";
import Summoner, { fetchSummonerInfo } from "./Summoner";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: null,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i, summoner, champId) {
    this.setState({ isActive: i })

    fetchSummonerInfo(summoner, champId);
  }

  render() {
    let { champ_icons, game } = this.props.game;
    // 'Destruct' this array of objects
    let champIds = champ_icons.map(x => { return parseInt(Object.keys(x)) })
    let champSquares = champ_icons.map(x => { return Object.values(x) })

    return(
      <div>
        <table>
          <thead>
            <tr>
              <th className="text-center">Team 1</th>
            </tr>
          </thead>

          <tbody>
            {game.participants.map((x, key) => {
              if (x.teamId === 100) {
                let iconPosition = champIds.indexOf(x.championId)

                return([
                  <tr>
                    <td>
                      <div
                        onClick={() =>
                          this.handleClick(key, x.summonerName, x.championId)
                        }
                      >
                        <img
                          src={champSquares[iconPosition]}
                          className="champ-square"
                        />
                        {x.summonerName}

                        <div
                          key={key}
                          className={`summInfo ${this.state.isActive === key ? 'slide' : ''}`}
                        >
                          <Summoner />
                        </div>
                      </div>
                    </td>
                  </tr>
                ])
              }
            })}
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th className="text-center">Team 2</th>
            </tr>
          </thead>

          <tbody>
            {game.participants.map(x => {
              if (x.teamId === 200) {
                let iconPosition = champIds.indexOf(x.championId)

                return([
                  <tr>
                    <td>
                      <img
                        src={champSquares[iconPosition]}
                        className="champ-square"
                      />
                      {x.summonerName}
                    </td>
                  </tr>
                ])
              }
            })}
          </tbody>
        </table>
      </div>
    )
  }
}
