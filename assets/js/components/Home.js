import React, { Component } from "react";

import Game from "./Game";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summonerName: '',
      server: 'NA',
      showGame: false,
      game: '',
      error: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.gameReady = this.gameReady.bind(this);
  }

  handleSubmit(event) {
    // Before submitting the csrf_token is a props passed from the PageController
    // using 'Plug'

    fetch('/find_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': this.props.csrf_token
      },
      body: JSON.stringify({
        summonerName: this.state.summonerName,
        server: this.state.server
      })
    })
    .then(resp => {
      if(!resp.ok) {
        throw Error(resp.statusText)
      }

      return resp;
    })
    .then(resp => { return resp.json() })
    .then(resp => {
      this.gameReady(resp);
    })
    .catch(err => {
      this.setState({
        error: true,
      });
    })

    event.preventDefault();
  }

  handleNameChange(event) {
    this.setState({ summonerName: event.target.value });
  }

  handleSelectChange(event) {
    this.setState({ server: event.target.value });
  }

  gameReady(game) {
    console.log(game);

    this.setState({
      showGame: true,
      game: game,
      error: false,
    });
  }

  render() {
    return(
      <div className="grid-x grid-margin-x">
        <div className="small-12 cell">
          {
            this.state.error &&
            <p className="callout alert">
              An error ocurred while searching for your game
            </p>
          }
        </div>

        <div className="text-center cell">
          <h1>Loker</h1>
        </div>

        <div className="text-center cell">
          <form onSubmit={this.handleSubmit}>
            <div className="grid-container">
              <div className="grid-x grid-padding-x">
                <div className="small-7 cell">
                  <input
                    type="text"
                    placeholder="Summoner name"
                    value={this.state.summonerName}
                    onChange={this.handleNameChange}
                    autoFocus
                    required
                  />
                </div>

                <div className="small-5 cell">
                  <select value={this.state.server} onChange={this.handleSelectChange}>
                    <option value="BR">BR</option>
                    <option value="EUNE">EUNE</option>
                    <option value="EUW">EUW</option>
                    <option value="LAN">LAN</option>
                    <option value="LAS">LAS</option>
                    <option value="NA">NA</option>
                  </select>
                </div>

                <div className="text-center cell">
                  <input type="submit" className="button" value="Search" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="small-12 cell">
          {
            this.state.showGame &&
            <Game
              game={this.state.game} csrf_token={this.props.csrf_token}
            />
          }
        </div>
      </div>
    )
  }
}
