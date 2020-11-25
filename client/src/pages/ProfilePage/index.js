import React from "react";
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
      <ProfilePicture />
      <Biography />
      <CurrentTrack />
      <FeaturedArtist />
      <FeaturedTrack />
      <ProfileLink />
      <SocialMedia />
      <SpotifyStats />
    </div>
  );
};

export default ProfilePage;
