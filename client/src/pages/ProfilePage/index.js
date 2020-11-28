import React, { Component } from 'react';
import Biography from '../../components/Biography';
import ProfileLink from '../../components/ProfileLink';
import SocialMedia from '../../components/SocialMedia';
import SpotifyStats from '../../components/SpotifyStats';
import TopStats from '../../components/TopStats';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div id='profile'>
        <Biography />
        <ProfileLink />
        <SocialMedia />
        <SpotifyStats />
        <TopStats/>
      </div>
    );
  };
}

export default ProfilePage;
