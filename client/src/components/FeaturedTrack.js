import React, { Component } from "react";
import Album from "../assets/Channel_ORANGE.jpg";
import "./index.css";
//import UserService from "../services/user.service";

class FeaturedTrack extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      tracks: "Lost-channel ORANGE-Frank Ocean",
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
        <h2 className="title"> Featured Tracks </h2>
        <div className="trackelement">
          <div className="columns">
            <img src={Album} className="album" alt="album" />
            <div className="columnRight">
              <h2>{this.state.name}</h2>
              <h2>{this.state.tracks.split("-")[0]}</h2>
              <p className="body">{this.state.tracks.split("-")[1]}</p>
              <p className="body">{this.state.tracks.split("-")[2]}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeaturedTrack;
