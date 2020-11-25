import React, { Component } from "react";
import "./index.css";
//import UserService from "../services/user.service";

class SocialMedia extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      userid: "12345",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      twitter: "https://www.twitter.com",
    };
    // change functions
    this.changeFacebook = this.changeFacebook.bind(this);
    this.changeInstagram = this.changeInstagram.bind(this);
    this.changeTwitter = this.changeTwitter.bind(this);
  }

  // check mount
  componentDidMount() {
    this.getSocials();
  }

  /* NOT FINISHED */
  getSocials() {
    //let socials = UserService.getSocials();
    //this.setState();
  }

  // change facebook URL
  changeFacebook(facebookURL) {
    this.setState({ facebook: facebookURL });
    /* USER SERVICE DOESNT WORK FOR NOW
        UserService.update({ facebook: this.state.facebook })
          .then(() => {
            console.log("Updated Facebook URL succesfully!");
          })
          .catch((e) => {
            console.log(e);
          });*/
  }

  // change instagram URL
  changeInstagram(instagramURL) {
    this.setState({ instagram: instagramURL });
    /* USER SERVICE DOESNT WORK FOR NOW
        UserService.update({ instagram: this.state.instagram })
          .then(() => {
            console.log("Updated Instagram URL succesfully!");
          })
          .catch((e) => {
            console.log(e);
          });*/
  }

  // change twitter URL
  changeTwitter(twitterURL) {
    this.setState({ twitter: twitterURL });
    /* USER SERVICE DOESNT WORK FOR NOW
        UserService.update({ twitter: this.state.twitter })
          .then(() => {
            console.log("Updated Twitter URL succesfully!");
          })
          .catch((e) => {
            console.log(e);
          });*/
  }

  // render functionn
  render() {
    return (
      <div>
        <a href={this.state.facebook}> FACEBOOK </a>{" "}
        <a href={this.state.instagram}> INSTAGRAM </a>{" "}
        <a href={this.state.twitter}> TWITTER </a>{" "}
      </div>
    );
  }
}

export default SocialMedia;
