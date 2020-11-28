import React, { Component } from 'react';
import Biography from '../../components/Biography';
import FeaturedArtist from '../../components/FeaturedArtist';
import FeaturedTrack from '../../components/FeaturedTrack';
import ProfileLink from '../../components/ProfileLink';
import SocialMedia from '../../components/SocialMedia';
import SpotifyStats from '../../components/SpotifyStats';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div>
        <Biography />
        <FeaturedArtist />
        <FeaturedTrack />
        <ProfileLink />
        <SocialMedia />
        <SpotifyStats />
      </div>
    );
  };
}

export default ProfilePage;
