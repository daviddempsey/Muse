import React, { Component } from "react";
import Artist from "../assets/frankocean.png";
import "../index.css";
//import UserService from "../services/user.service";

class FeaturedArtist extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      artists: "Kanye West,",
    };
    this.changeArtist = this.changeArtist.bind(this);
  }

  // check mount
  componentDidMount() {}

  getFeaturedArtist() {}

  changeArtist(newArtist) {
    this.setState({ artist: newArtist });
  }

  // render function
  render() {
    return (
      <div>
        <h2 className="title"> Top Artists </h2>
        <div className="artistimgs">
          <img src={Artist} className="artistimg" alt="artist" />
        </div>
      </div>
    );
  }
}

export default FeaturedArtist;
