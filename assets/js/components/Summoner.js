import React, { Component } from 'react';

export default class Summoner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, "props")
    return(
      <div className="grid-x grid-padding-x">
        <div className="small-6 cell">
          <img
            className="champLoading"
            src={this.props.champLoading}
          />
        </div>

        <div className="small-6 cell">
          <img
            className="tier"
            src={"/images/ranks/" + this.props.tier + ".png"}
          />
          <h2 className="rank">{this.props.rank}</h2>
        </div>
      </div>
    )
  }
}
