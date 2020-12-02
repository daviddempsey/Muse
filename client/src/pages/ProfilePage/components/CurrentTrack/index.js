import React, { Component } from "react";
import Album from "../../assets/Channel_ORANGE.jpg";
import "./index.css";
//import userService from "../services/user.service";

class CurrentTrack extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      name: "Pyramids",
      artist: "Frank Ocean",
      album: "channel ORANGE",
      playlist: "This is Frank Ocean",
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
        <h2 className="title">Now Listening To</h2>
        <div className="trackelement">
          <div className="columns">
            <img src={Album} alt="album" />
            <div className="trackcontent">
              <h2>{this.state.name}</h2>
              <p className="body">{this.state.album}</p>
              <p className="body">{this.state.artist}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentTrack;
