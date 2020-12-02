import React from "react";
import "./index.css";
import DefaultLayout from "../DefaultLayout";
import Decal from "./assets/decal.png";
import ProfilePicture from "./components/ProfilePicture";
import Biography from "./components/Biography";
import CurrentTrack from "./components/CurrentTrack";
import FeaturedArtist from "./components/FeaturedArtist";
import FeaturedTrack from "./components/FeaturedTrack";
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
              <img src={Decal} className="decal" alt="decal" />
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
                  <FeaturedTrack />
                </div>
                <div className="artists">
                  <FeaturedArtist />
                </div>
                {/*<div className="playlists"></div>*/}
              </div>
              <div className="col-2">
                <div className="stats">
                  <SpotifyStats />
                </div>
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
