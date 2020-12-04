import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./index.css";

//import CurrentTrack from "./components/CurrentTrack";
import DefaultLayout from "../DefaultLayout";
import Decal from "./assets/decal.png";
import ProfilePicture from "./components/ProfilePicture";
import Biography from "./components/Biography";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import ProfileLink from "./components/ProfileLink";
import SocialMedia from "./components/SocialMedia";
import SpotifyStats from "./components/SpotifyStats";
import EditProfile from "./components/EditProfile";
import Popup from "./components/Popup";
//import SpotifyPlaylists from "./components/SpotifyPlaylists";

import Cookies from "js-cookie";
//import fb from "../../base";
import "firebase/auth";
//const auth = fb.auth();

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseToken: Cookies.get("token"),
    };
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div className="filter">
        <div className="page" id="page">
          <DefaultLayout>
            <div className="content">
              <div className="personal">
                <img src={Decal} className="decal" alt="" />
                <div className="rows">
                  <div className="row-1">
                    <ProfilePicture />
                  </div>
                  <div className="row-2">
                    <h1 className="title">Username</h1>
                    <EditProfile />
                    <ProfileLink />
                  </div>
                  <div className="row-2">
                    <SocialMedia />
                  </div>
                  <div className="row-3">
                    <Biography />
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="col-1">
                  {/*
                  <div className="tracks">
                    <CurrentTrack />
                  </div>
                  */}
                  <div className="tracks">
                    <TopTracks />
                  </div>
                  <div className="artists">
                    <TopArtists />
                  </div>
                  {/*
                <div className="playlists">
                  <SpotifyPlaylists />
                </div>
                */}
                </div>
                <div className="col-2">
                  <div className="stats">
                    <SpotifyStats />
                  </div>
                  {/*<div className="fromfriends"></div>*/}
                </div>
              </div>
            </div>
          </DefaultLayout>
        </div>
        <div className="popup" id="popup">
          <Popup />
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
