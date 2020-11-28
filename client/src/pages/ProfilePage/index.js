import React, { Component } from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import Biography from '../../components/Biography';
import ProfileLink from '../../components/ProfileLink';
import SocialMedia from '../../components/SocialMedia';
import SpotifyStats from '../../components/SpotifyStats';
import TopStats from '../../components/TopStats';
import FeaturedPlaylists from '../../components/FeaturedPlaylists';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div id='profile-page'>
        <DefaultLayout>
          <div id='profile-section'>
            <Biography />
            <ProfileLink />
            <SocialMedia />
            <SpotifyStats />
            <TopStats />
            <FeaturedPlaylists />
          </div>
        </DefaultLayout>
      </div>
    );
  };
}

export default ProfilePage;
