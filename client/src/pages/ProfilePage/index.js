import React from "react";
import "./index.css";
import DefaultLayout from "../DefaultLayout";
import Decal from "./assets/decal.png";
import ProfilePicture from "./components/ProfilePicture";
import Biography from "./components/Biography";
import CurrentTrack from "./components/CurrentTrack";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import ProfileLink from "./components/ProfileLink";
import SocialMedia from "./components/SocialMedia";
import SpotifyStats from "./components/SpotifyStats";
import EditProfile from "./components/EditProfile";
import Popup from "./components/Popup";

const ProfilePage = () => {
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
                  <h1 className="title">Frank_Ocean_22</h1>
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
                <div className="tracks">
                  <CurrentTrack />
                </div>
                <div className="tracks">
                  <TopTracks />
                </div>
                <div className="artists">
                  <TopArtists />
                </div>
                {/*<div className="playlists"></div>*/}
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

export default ProfilePage;

/*
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import ProfilePicture from '../../components/Profile/ProfilePicture';
import Biography from '../../components/Profile/Biography';
import ProfileLink from '../../components/Profile/ProfileLink';
import SocialMedia from '../../components/Profile/SocialMedia';
import TopStats from '../../components/Profile/TopStats';

import Cookies from 'js-cookie';
import fb from '../../base';
import 'firebase/auth';

const auth = fb.auth();

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseToken: Cookies.get('token'),
    };
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div>
        <div id='profile-page'>
          <DefaultLayout>
            <div id='profile-section'>
              <ProfilePicture />
              <button onClick={() => this.props.history.push('/editprofile')}>
                Edit Profile
              </button>
              {<Biography />}
              {<ProfileLink />}
              {<SocialMedia />}
              {<TopStats />}
            </div>
          </DefaultLayout>
        </div>
        <div id='cookie stuff'>
          <p>{Cookies.get('token')}</p>
          <p>{auth.currentUser.email}</p>
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
*/
