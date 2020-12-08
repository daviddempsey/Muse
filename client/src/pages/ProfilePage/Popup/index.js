import React, { Component } from "react";
import Facebook from "../assets/fb.png";
import Instagram from "../assets/ig.png";
import Twitter from "../assets/twitter.png";
import TikTok from "../assets/tiktok.png";
import { withRouter } from "react-router-dom";
import UserService from "../../../services/user.service";
import "./index.css";
import fb from "../../../base.js";
import Cookies from "js-cookie";
import "firebase/auth";
const auth = fb.auth();

class Popup extends Component {
  //constructor
  constructor(props) {
    super(props);
    // set default state of text element instead text box
    this.state = {
      profilePicture: "",
      biography: "",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      twitter: "https://www.twitter.com",
      tiktok: "https://www.tiktok.com",
      playlists: [],
      firebaseToken: Cookies.get("token"),
    };
    //event handlers for when we update text field and submit button
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePFPChange = this.handlePFPChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.handleInstagramChange = this.handleInstagramChange.bind(this);
    this.handleTikTokChange = this.handleTikTokChange.bind(this);
    this.handleTwitterChange = this.handleTwitterChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //checks if component mounted
  componentDidMount() {
    let that = this;
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      this.getProfilePicture(userEmail);
      this.getBiography(userEmail);
      this.getFacebook(userEmail);
      this.getInstagram(userEmail);
      this.getTwitter(userEmail);
      this.getTikTok(userEmail);
    } else {
      auth.onAuthStateChanged(async function (user) {
        if (user) {
          let userEmail = user.email;
          that.getProfilePicture(userEmail);
          that.getBiography(userEmail);
          that.getFacebook(userEmail);
          that.getInstagram(userEmail);
          that.getTwitter(userEmail);
          that.getTikTok(userEmail);
        }
      });
    }
  }

  // GET STUFF NEEDS TO BE UPDATED WITH USERSERVICE

  getProfilePicture = async (email) => {
    this.setState({
      profilePicture: await UserService.getProfilePicture(email),
    });
  };

  getBiography = async (email) => {
    this.setState({ biography: await UserService.getBiography(email) });
  };

  getFacebook = async (email) => {
    this.setState({ facebook: await UserService.getFacebook(email) });
  };

  getInstagram = async (email) => {
    this.setState({ instagram: await UserService.getInstagram(email) });
  };

  getTwitter = async (email) => {
    this.setState({ twitter: await UserService.getTwitter(email) });
  };

  getTikTok = async (email) => {
    this.setState({ tiktok: await UserService.getTikTok(email) });
  };

  getPlaylists() {
    let playlists = ["A", "B", "C"];
    this.setState({ playlists: playlists });
  }

  // SETTERS TO DATABSE

  setProfilePicture = (email) => {
    UserService.setProfilePicture(email, this.state.profilePicture);
  };

  setBiography = (email) => {
    UserService.setBiography(email, this.state.biography);
  };

  setFacebook = (email) => {
    UserService.setFacebook(email, this.state.facebook);
  };

  setInstagram = (email) => {
    UserService.setInstagram(email, this.state.instagram);
  };

  setTwitter = (email) => {
    UserService.setTwitter(email, this.state.twitter);
  };

  setTikTok = (email) => {
    UserService.setTiktok(email, this.state.tiktok);
  };

  // onChange updates the state
  handlePFPChange(event) {
    this.setState({ profilePicture: event.target.value });
  }

  handleBioChange(event) {
    this.setState({ biography: event.target.value });
  }

  handleFacebookChange(event) {
    this.setState({ facebook: event.target.value });
  }

  handleInstagramChange(event) {
    this.setState({ instagram: event.target.value });
  }

  handleTwitterChange(event) {
    this.setState({ twitter: event.target.value });
  }

  handleTikTokChange(event) {
    this.setState({ tiktok: event.target.value });
  }

  /* event handler for when user hits submit button*/
  // onSubmit updates database once user is done.
  handleSubmit(event) {
    const userEmail = fb.auth().currentUser.email;
    //bioText = this.state.value;
    this.setProfilePicture(userEmail);
    this.setBiography(userEmail);
    this.setFacebook(userEmail);
    this.setInstagram(userEmail);
    this.setTwitter(userEmail);
    this.setTikTok(userEmail);
    event.preventDefault();
  }

  async handleClick(event) {
    this.handleSubmit(event);
    this.togglePop();

    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      this.getProfilePicture(userEmail);
      this.getBiography(userEmail);
      this.getFacebook(userEmail);
      this.getInstagram(userEmail);
      this.getTwitter(userEmail);
      this.getTikTok(userEmail);
      if (
        (await UserService.getProfilePicture(userEmail)) ===
          this.state.profilePicture ||
        (await UserService.getBiography(userEmail)) === this.state.biography ||
        (await UserService.getFacebook(userEmail)) === this.state.facebook ||
        (await UserService.getInstagram(userEmail)) === this.state.instagram ||
        (await UserService.getTwitter(userEmail)) === this.state.twitter ||
        (await UserService.getTikTok(userEmail)) === this.state.tiktok
      ) {
        window.location.reload();
      }
    } else {
      auth.onAuthStateChanged(async function (user) {
        let userEmail = user.email;
        this.getProfilePicture(userEmail);
        this.getBiography(userEmail);
        this.getFacebook(userEmail);
        this.getInstagram(userEmail);
        this.getTwitter(userEmail);
        this.getTikTok(userEmail);
        if (
          (await UserService.getProfilePicture(userEmail)) ===
            this.state.profilePicture ||
          (await UserService.getBiography(userEmail)) ===
            this.state.biography ||
          (await UserService.getFacebook(userEmail)) === this.state.facebook ||
          (await UserService.getInstagram(userEmail)) ===
            this.state.instagram ||
          (await UserService.getTwitter(userEmail)) === this.state.twitter ||
          (await UserService.getTikTok(userEmail)) === this.state.tiktok
        ) {
          window.location.reload();
        }
      });
    }
  }

  togglePop() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("page").style.filter = "brightness(1)";
    document.getElementById("page").style.pointerEvents = "auto";
    document.getElementById("page").style.userSelect = "auto";
  }

  toggleChange() {
    document.getElementById("change").style.display = "none";
    document.getElementById("pfp-form").style.display = "initial";
  }

  /* TODO: edit social media, edit profile picture, featured artist and track*/

  /* render text box*/
  render() {
    return (
      <div className="modal">
        <button className="close" onClick={this.togglePop}>
          &times;
        </button>
        <div className="content">
          <form id="edit-profile-form" onSubmit={this.handleClick}>
            <div className="row-1">
              <div className="col-1">
                <div className="imgcontainer">
                  <img src={this.state.profilePicture} alt="pfp" />
                </div>
                <button
                  className="btn"
                  type="button"
                  onClick={this.toggleChange}
                >
                  <h3 id="change">Change</h3>
                </button>
                <div className="form" id="pfp-form">
                  <textarea
                    className="input"
                    type="text"
                    name="pfp"
                    placeholder="Enter link..."
                    value={this.state.profilePicture}
                    onChange={this.handlePFPChange}
                  ></textarea>
                </div>
              </div>
              <div className="col-2">
                <h1 className="title"> Edit Bio </h1>
                <div className="form" id="biography-form">
                  <textarea
                    className="input"
                    type="text"
                    name="biography"
                    placeholder="Enter bio..."
                    value={this.state.biography}
                    onChange={this.handleBioChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row-2">
              <h1 className="title"> Manage Socials </h1>
              <div className="form" id="socials-form">
                <div id="facebook-form">
                  <img src={Facebook} className="socials" alt="fb" />
                  <textarea
                    className="input"
                    type="text"
                    placeholder="Enter username..."
                    value={this.state.facebook}
                    onChange={this.handleFacebookChange}
                  />
                </div>
                <div id="instagram-form">
                  <img src={Instagram} className="socials" alt="fb" />
                  <textarea
                    className="input"
                    type="text"
                    placeholder="Enter username..."
                    value={this.state.instagram}
                    onChange={this.handleInstagramChange}
                  />
                </div>
                <div id="twitter-form">
                  <img src={Twitter} className="socials" alt="fb" />
                  <textarea
                    className="input"
                    type="text"
                    placeholder="Enter username..."
                    value={this.state.twitter}
                    onChange={this.handleTwitterChange}
                  />
                </div>
                <div id="tiktok-form">
                  <img src={TikTok} className="socials" alt="fb" />
                  <textarea
                    className="input"
                    type="text"
                    placeholder="Enter username..."
                    value={this.state.tiktok}
                    onChange={this.handleTikTokChange}
                  />
                </div>
              </div>
            </div>
            <div className="row-3">
              <button className="btn" type="submit" onClick={this.togglePop}>
                <h3>Save</h3>
              </button>
              <button className="btn" type="button" onClick={this.togglePop}>
                <h3>Cancel</h3>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Popup);
