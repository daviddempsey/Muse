import React, { Component } from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
//import ProfilePicture from '../../components/Profile/ProfilePicture';
//import Biography from '../../components/Profile/Biography';
/* import ProfileLink from '../../components/Profile/ProfileLink'; */
import SocialMedia from '../../components/Profile/SocialMedia';
/* import SpotifyStats from '../../components/Profile/SpotifyStats';
import TopStats from '../../components/Profile/TopStats';
import FeaturedPlaylists from '../../components/Profile/FeaturedPlaylists'; */

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
            {/* <ProfilePicture />
            <Biography /> */}
            {/* <ProfileLink /> */}
            <SocialMedia />{' '}
            {/* <SpotifyStats />
                            <TopStats />
                            <FeaturedPlaylists /> */}{' '}
          </div>{' '}
        </DefaultLayout>{' '}
      </div>
    );
  };
}

export default ProfilePage;
