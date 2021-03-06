import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./index.css";

import DefaultLayout from "../DefaultLayout";
import Decal from "./assets/decal.png";
import Add from "./assets/friend.svg";
import Remove from "./assets/remove.svg";
import DM from "./assets/dm.svg";
import ProfilePicture from "./ProfilePicture";
import Biography from "./Biography";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import TopGenres from "./TopGenres";
import ProfileLink from "./ProfileLink";
import SocialMedia from "./SocialMedia";
import Harmonize from "./Harmonize";
import EditProfile from "./EditProfile";
import EditPopup from "./EditPopup";
import SpotifyPlaylists from "./SpotifyPlaylists";
import Name from "./Name";

import UserService from "../../services/user.service";
import fb from "../../base";
import "firebase/auth";

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    // get email
    let email = this.props.match.params.user_email;
    let decodedEmail = atob(email);

    this.state = {
      userEmail: decodedEmail,
      userEdit: false,
      friend: false,
      checkingUser: true,
    };

    this.userEditCompare = this.userEditCompare.bind(this);
    this.friendsCompare = this.friendsCompare.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.authUser = this.authUser.bind(this);
  }

  authUser() {
    return new Promise(function (resolve, reject) {
      fb.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject("User not logged in");
        }
      });
    });
  }

  componentDidMount = () => {
    this.authUser().then(() => {
      this.userEditCompare().then((userMatch) => {
        this.setState({
          userEdit: userMatch,
          checkingUser: false,
        });
      });
      this.friendsCompare().then((friendsMatch) => {
        this.setState({
          friend: friendsMatch,
        });
      });
      window.scrollTo(0, 0);
    });
  };

  async userEditCompare() {
    let currEmail = fb.auth().currentUser.email;
    if (currEmail === this.state.userEmail) {
      return true;
    }
    return false;
  }

  async addFriend() {
    let myEmail = fb.auth().currentUser.email;
    let friendEmail = atob(this.props.match.params.user_email);
    UserService.addFriend(myEmail, friendEmail);

    fb.firestore()
      .collection("user")
      .doc(myEmail)
      .get()
      .then((res) => {
        if (res) {
          let friendsList = res.data()["friends"];
          if (friendsList.includes(friendEmail)) {
            this.friendsCompare().then((friendsMatch) => {
              this.setState({
                friend: friendsMatch,
              });
            });
          } else {
            this.componentDidMount();
            this.friendsCompare().then((friendsMatch) => {
              this.setState({
                friend: friendsMatch,
              });
            });
          }
        }
      });
  }

  async removeFriend() {
    let myEmail = fb.auth().currentUser.email;
    let friendEmail = atob(this.props.match.params.user_email);
    UserService.removeFriend(myEmail, friendEmail);

    fb.firestore()
      .collection("user")
      .doc(myEmail)
      .get()
      .then((res) => {
        if (res) {
          let friendsList = res.data()["friends"];
          if (!friendsList.includes(friendEmail)) {
            this.friendsCompare().then((friendsMatch) => {
              this.setState({
                friend: friendsMatch,
              });
            });
          } else {
            this.componentDidMount();
            this.friendsCompare().then((friendsMatch) => {
              this.setState({
                friend: friendsMatch,
              });
            });
          }
        }
      });
  }

  async friendsCompare() {
    // use firebase to check for friend
    let currentUserEmail = fb.auth().currentUser.email;
    let friendsDoc = fb.firestore().collection("user").doc(currentUserEmail);
    let friendsList = (await friendsDoc.get()).data()["friends"];

    // get curr email
    let currEmail = this.props.match.params.user_email;
    let decodedEmail = atob(currEmail);

    if (friendsList.includes(decodedEmail)) {
      return true;
    }
    return false;
  }

  // TODO: RENDER IN HARMONY BUTTON
  // also idk if i passed props correctly for addfriend in line 110
  // everything else should work once we figure out logic
  render = () => {
    if (this.state.checkingUser) return null;
    return (
      <div className="filter">
        <div className="page" id="page">
          <DefaultLayout>
            <div className="content">
              <div className="personal">
                <img src={Decal} className="decal" alt="" />
                <div className="rows">
                  <div className="row-1">
                    <ProfilePicture userEmail={this.state.userEmail} />
                  </div>
                  <div className="row-2">
                    <Name userEmail={this.state.userEmail} />
                    {this.state.userEdit && (
                      <EditProfile userEmail={this.state.userEmail} />
                    )}
                    <ProfileLink userEmail={this.state.userEmail} />
                    {!this.state.userEdit && (
                      <Harmonize
                        userEmail={fb.auth().currentUser.email}
                        otherEmail={atob(this.props.match.params.user_email)}
                      />
                    )}
                    {!this.state.friend && !this.state.userEdit && (
                      <button
                        className="addfriend"
                        id="addfriend"
                        onClick={() => this.addFriend()}
                      >
                        <img src={Add} className="add" alt="add" />
                      </button>
                    )}
                    {this.state.friend && !this.state.userEdit && (
                      <div>
                        <button
                          className="dm"
                          id="dm"
                          onClick={() =>
                            this.props.history.push(
                              "/messages/" + btoa(this.state.userEmail)
                            )
                          }
                        >
                          <img src={DM} className="message" alt="dm" />
                        </button>
                        <button
                          className="removefriend"
                          id="removefriend"
                          onClick={() => this.removeFriend()}
                        >
                          <img src={Remove} className="remove" alt="remove" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="row-2">
                    <SocialMedia userEmail={this.state.userEmail} />
                  </div>
                  <div className="row-3">
                    <Biography userEmail={this.state.userEmail} />
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="col-1">
                  <div className="tracks">
                    <TopTracks userEmail={this.state.userEmail} />
                  </div>
                  <div className="artists">
                    <TopArtists userEmail={this.state.userEmail} />
                  </div>
                </div>
                <div className="col-2">
                  <div className="genres">
                    <TopGenres userEmail={this.state.userEmail} />
                  </div>
                  <div className="playlists">
                    <SpotifyPlaylists userEmail={this.state.userEmail} />
                  </div>
                </div>
              </div>
            </div>
          </DefaultLayout>
        </div>
        <div className="editpopup" id="editpopup">
          <EditPopup />
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
