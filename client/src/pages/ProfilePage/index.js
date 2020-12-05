import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';
import fb from '../../base';
import 'firebase/auth';

import DefaultLayout from '../DefaultLayout';
import ProfilePicture from '../../components/Profile/ProfilePicture';
import Biography from '../../components/Profile/Biography';
import ProfileLink from '../../components/Profile/ProfileLink';
import SocialMedia from '../../components/Profile/SocialMedia';
import TopStats from '../../components/Profile/TopStats';
import PublicPlaylists from '../../components/Profile/PublicPlaylists';

class ProfilePage extends Component {

  constructor(props) {
    super(props);

    // get email
    let email = this.props.match.params.user_email;
    let decodedEmail = atob(email);

    this.state = {
      userEmail: decodedEmail,
      userEdit: false,
    };

    this.userEditCompare = this.userEditCompare.bind(this);
  }

  componentDidMount = () => {
    let edit = this.userEditCompare(); 
    this.setState({userEdit: edit});
  };

  async userEditCompare() {
    if (fb.auth().currentUser) {
      let currEmail = fb.auth().currentUser.email;
      if (currEmail === this.state.userEmail) {
        console.log(currEmail);
        return true;
      } 
    } else {
      fb.auth().onAuthStateChanged(function (user) {
        if (user) {
          if (user.email === this.state.userEmail) {
            console.log(user.email);
            return true;
          }
        }
      });
    }
    return false;
  }

  render = () => {
    return (
      <div>
        <div id='profile-page'>
          <DefaultLayout>
            <div id='profile-section'>
              <ProfilePicture userEmail={this.state.userEmail}/>
              <button onClick={() => this.props.history.push('/editprofile')}>Edit Profile</button>
              <p>{this.state.userEmail}</p>
              <Biography userEmail={this.state.userEmail}/>
              <ProfileLink userEmail={this.state.userEmail}/>
              <SocialMedia userEmail={this.state.userEmail}/>
              <TopStats userEmail={this.state.userEmail}/>
              <PublicPlaylists userEmail={this.state.userEmail}/>
            </div>
          </DefaultLayout>
        </div>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
