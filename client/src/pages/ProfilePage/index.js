import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import ProfilePicture from '../../components/Profile/ProfilePicture';
import Biography from '../../components/Profile/Biography';
import ProfileLink from '../../components/Profile/ProfileLink';
import SocialMedia from '../../components/Profile/SocialMedia';
import TopStats from '../../components/Profile/TopStats';

import Cookies from 'js-cookie';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseToken: Cookies.get('token'),
    };
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div>
        <div id='profile-page'>
          <DefaultLayout>
            <div id='profile-section'>
              <ProfilePicture />
              <button onClick={() => this.props.history.push('/editprofile')}>
                Edit Profile
              </button>
              <Biography />
              <ProfileLink />
              <SocialMedia />
              <TopStats />
            </div>
          </DefaultLayout>
        </div>
        {/* <div id='cookie stuff'>
          <p>{Cookies.get('token')}</p>
          <p>{auth.currentUser.email}</p>
        </div> */}
      </div>
    );
  };
}

export default withRouter(ProfilePage);
