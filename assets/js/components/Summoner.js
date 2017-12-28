import React, { Component } from 'react';

export default class Summoner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, "props")
    return(
      <div>
        <img
          className="champLoading"
          src={this.props.champLoading}
        />
      </div>
    )
  }
}
