import React from "react";
import "./index.css";
import ProfilePicture from "../../components/ProfilePicture";
import Biography from "../../components/Biography";
import CurrentTrack from "../../components/CurrentTrack";
import FeaturedArtist from "../../components/FeaturedArtist";
import FeaturedTrack from "../../components/FeaturedTrack";
import ProfileLink from "../../components/ProfileLink";
import SocialMedia from "../../components/SocialMedia";
import SpotifyStats from "../../components/SpotifyStats";

const ProfilePage = () => {
  return (
    <div>
      <div className="content">
        <div className="personal">
          <h1 className="title">Frank_Ocean_22</h1>
          <ProfilePicture />
          <Biography />
          <ProfileLink />
          <SocialMedia />
        </div>
        <div className="column">
          <div className="tracks">
            <CurrentTrack />
          </div>
          <div className="tracks">
            <FeaturedTrack />
          </div>
          <div className="artists">
            <FeaturedArtist />
          </div>
          <div className="playlists"></div>
        </div>
        <div className="column">
          <div className="stats">
            <SpotifyStats />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
