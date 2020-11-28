/* DOES NOT WORK WE DON'T NEED IT*/

import React, { Component } from 'react';
//import userService from "../services/user.service";

class CurrentTrack extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      name: 'Pyramids',
      artist: 'Frank Ocean',
      album: 'Channel Orange',
      playlist: 'vibes?',
    };

    // spotify api call function
    this.getCurrentTrack = this.getCurrentTrack.bind(this);
  }

  // check mount
  componentDidMount() {
    this.getCurrentTrack();
  }

  // gets current track from
  getCurrentTrack() {
    /*var currentTrack = {
            url:
              "https://api.spotify.com/v1/me/player/currently-playing",
            headers: { Authorization: "Bearer" + access_token },
            json: true,
        };
        request.get(currentTrack, function (error, response, trackInfo) {
            this.setState({
                name: trackInfo.item
            });
        });*/
  }

  // render functionn
  render() {
    return (
      <div>
        <h1>Why hello there current track</h1>
        <p>{this.state.name}</p>
        <p>{this.state.artists}</p>
        <p>{this.state.album}</p>
        <p>{this.state.playlist}</p>
      </div>
    );
  }
}

export default CurrentTrack;
