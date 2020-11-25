import React, { Component } from 'react';
//import UserService from "../services/user.service";

class FeaturedArtist extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      artists: 'Kanye West,',
    };
    this.changeArtist = this.changeArtist.bind(this);
  }

  // check mount
  componentDidMount() {}

  getFeaturedArtist() {}

  changeArtist(newArtist) {
    this.setState({ artist: newArtist });
  }

  // render functionn
  render() {
    return (
      <div>
        <h1> Hello Featured Artist </h1> <h2> {this.state.artist} </h2>{' '}
      </div>
    );
  }
}

export default FeaturedArtist;
