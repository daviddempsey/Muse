import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Biography from '../../components/Biography';
import CurrentTrack from '../../components/CurrentTrack';
import FeaturedArtist from '../../components/FeaturedArtist';
import FeaturedTrack from '../../components/FeaturedTrack';
import ProfileLink from '../../components/ProfileLink';
import SocialMedia from '../../components/SocialMedia';
import SpotifyStats from '../../components/SpotifyStats';
import fb from '../../base';

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
      <div>
        <Biography />
        <CurrentTrack />
        <FeaturedArtist />
        <FeaturedTrack />
        <ProfileLink />
        <SocialMedia />
        <SpotifyStats />
        <p>{Cookies.get('token')}</p>
        <p>{fb.auth().currentUser.email}</p>
      </div>
    );
  };
}

export default ProfilePage;
