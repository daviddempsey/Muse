import React, { Component } from 'react';
//import UserService from "../services/user.service";

class FeaturedTrack extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      tracks: 'People in Paris - Kanye West',
    };
    this.changeTrack = this.changeTrack.bind(this);
  }

  // check mount
  componentDidMount() {}

  getFeaturedTrack() {}

  changeTrack(newTrack) {
    this.setState({ track: newTrack });
  }

  // render functionn
  render() {
    return (
      <div>
        <h1> Hello Featured Track </h1> <h2> {this.state.track} </h2>{' '}
      </div>
    );
  }
}

export default FeaturedTrack;
