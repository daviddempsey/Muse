import React, { Component } from "react";

class SocialMedia extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      userid: "12345",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      twitter: "https://www.twitter.com"
    };
    // change functions
    this.changeFacebook = this.changeFacebook.bind(this);
    this.changeInstagram = this.changeInstagram.bind(this);
    this.changeTwitter = this.changeTwitter.bind(this);
  }

  // change facebook URL
  changeFacebook(facebookURL) {
    this.setState({facebook: facebookURL});
  }

  // change instagram URL
  changeInstagram(instagramURL) {
    this.setState({instagram: instagramURL});
  }

  // change twitter URL
  changeTwitter(twitterURL) {
    this.setState({twitter: twitterURL});
  }

  // render functionn
  render() {
    return (
      <div>
        <h1>Hello Social Media</h1>
        <a href={this.state.facebook}> FACEBOOK </a>
        <a href={this.state.instagram}> INSTAGRAM </a>
        <a href={this.state.twitter}> TWITTER </a>
      </div>
    );
  }
}

export default SocialMedia;
