import React, { Component } from "react";
import Summoner from "./Summoner";

export default class Game extends Component {
  constructor(props) {
    super(props);

    // 'summonerInfo' is the state of the request when a single summoner is
    // retrieved.
    this.state = {
      isActive: null,
      summonerInfo: null,
      showSummoner: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i, summId, champId, server) {
    this.setState({
      isActive: i,
      showSummoner: false
    })

    fetch('/retrieve_summoner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summId: summId,
        champId: champId,
        server: server
      })
    })
    .then(resp => { return resp.json() })
    .then(resp => {
      this.setState({
        summonerInfo: resp,
        showSummoner: true
      })
    })
  }

  componentWillUnmount() {
    this.setState({
      isActive: null
    })
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
                          this.handleClick(
                            key,
                            x.summonerId,
                            x.championId,
                            this.props.server
                          )
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
                          {
                            this.state.showSummoner &&
                            <Summoner
                              tier={this.state.summonerInfo.tier}
                              rank={this.state.summonerInfo.rank}
                              champLoading={this.state.summonerInfo.champ_loading}
                            />
                          }
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
            {game.participants.map((x, key) => {
              if (x.teamId === 200) {
                let iconPosition = champIds.indexOf(x.championId)

                return([
                  <tr>
                    <td>
                      <div
                        onClick={() =>
                          this.handleClick(
                            key,
                            x.summonerId,
                            x.championId,
                            this.props.server
                          )
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
                          {
                            this.state.showSummoner &&
                            <Summoner
                              tier={this.state.summonerInfo.tier}
                              rank={this.state.summonerInfo.rank}
                              champLoading={this.state.summonerInfo.champ_loading}
                            />
                          }
                        </div>
                      </div>
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
