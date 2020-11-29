import React, { Component } from "react";
import Album from "../assets/Channel_ORANGE.jpg";
import "../index.css";
//import UserService from "../services/user.service";

class FeaturedTrack extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      tracks: [
        "Lost-channel ORANGE-Frank Ocean",
        "Forrest Gump-channel ORANGE-Frank Ocean",
        "Super Rich Kids-channel ORANGE-Frank Ocean",
      ],
    };
    this.changeTrack = this.changeTrack.bind(this);
  }

  // check mount
  componentDidMount() {}

  getFeaturedTrack() {}

  changeTrack(newTrack) {
    this.setState({ track: newTrack });
  }

  // render function
  render() {
    return (
      <div>
        <h2 className="title"> Top Tracks </h2>
        <div className="trackelement">
          <div className="columns">
            <img src={Album} className="album" alt="album" />
            <div className="trackcontent">
              <h2>{this.state.tracks[0].split("-")[0]}</h2>
              <p className="body">{this.state.tracks[0].split("-")[1]}</p>
              <p className="body">{this.state.tracks[0].split("-")[2]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedTrack;
