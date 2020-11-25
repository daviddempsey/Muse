import React, { Component } from "react";
import "./index.css";
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
        <h1 className="title"> Featured Artists </h1>
        <h2> {this.state.artist} </h2>{" "}
      </div>
    );
  }
}

export default FeaturedArtist;
