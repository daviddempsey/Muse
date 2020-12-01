import React, { Component } from 'react';
import Cookies from 'js-cookie';
import fb from '../../base';
import 'firebase/auth';
import './index.css';
import DefaultLayout from '../DefaultLayout';
import Biography from '../../components/Biography';
import ProfileLink from '../../components/ProfileLink';
import SocialMedia from '../../components/SocialMedia';
import SpotifyStats from '../../components/SpotifyStats';
import TopStats from '../../components/TopStats';
import FeaturedPlaylists from '../../components/FeaturedPlaylists';

const auth = fb.auth();

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseToken: Cookies.get('token')
    };
    console.log("OH HELLO, TERMINAL", Cookies.get('token'));
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
