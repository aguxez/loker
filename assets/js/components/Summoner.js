import React, { Component } from 'react';

export default class Summoner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1>Testing</h1>
      </div>
    )
  }
}

const fetchSummonerInfo = function(summoner, champId) {
  fetch('/retrieve_summoner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: summoner,
      champId: champId
    })
  })
  .then(resp => { return resp.json() })
  .then(resp => console.log(resp))
}

export { fetchSummonerInfo };
