import React from "react";
import "./index.css";
import DefaultLayout from "../DefaultLayout";
import HeaderIcon from "./assets/headericon.png";
import ProfilePicture from "./components/ProfilePicture";
import Biography from "./components/Biography";
import CurrentTrack from "./components/CurrentTrack";
import FeaturedArtist from "./components/FeaturedArtist";
import FeaturedTrack from "./components/FeaturedTrack";
import ProfileLink from "./components/ProfileLink";
import SocialMedia from "./components/SocialMedia";
import SpotifyStats from "./components/SpotifyStats";

const ProfilePage = () => {
  return (
    <div>
      <DefaultLayout>
        <div className="content">
          <div className="personal">
            <img src={HeaderIcon} className="header" alt="hi" />
            <div className="rows">
              <div className="rowTop">
                <ProfilePicture />
              </div>
              <div className="rowMid">
                <h1 className="title">Frank_Ocean_22</h1>
                <ProfileLink />
              </div>
              <div className="rowMid">
                <SocialMedia />
              </div>
              <div className="rowBot">
                <Biography />
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="columnLeft">
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
            <div className="columnRight">
              <div className="stats">
                <SpotifyStats />
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default ProfilePage;
