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
    console.log(email);
    let decodedEmail = atob(email);
    console.log(decodedEmail);

    this.state = {
      userEmail: decodedEmail,
      userEdit: false,
      checkingUser: true
    };

    // console.log(this.state.userEmail);

    this.userEditCompare = this.userEditCompare.bind(this);
    this.authUser = this.authUser.bind(this);
  }

  authUser() {
    return new Promise(function (resolve, reject) {
       fb.auth().onAuthStateChanged(function(user) {
          if (user) {
             resolve(user);
          } else {
             reject('User not logged in');
          }             
       });
    });
 }

  componentDidMount = () => {
    this.authUser().then(() => {
      this.userEditCompare().then((userMatch) => {
        this.setState({
          userEdit: userMatch,
          checkingUser: false
        });
      }); 
    });
  };

  async userEditCompare() {
    let currEmail = fb.auth().currentUser.email;
    if (currEmail === this.state.userEmail) {
      return true;
    } 
    return false;
  }


  render = () => {
    if (this.state.checkingUser) return null;
    return (
        <div id='profile-page'>
          <DefaultLayout>
            <div id='profile-section'>
              <ProfilePicture userEmail={this.state.userEmail}/>
              <Biography userEmail={this.state.userEmail}/>
              <p>{this.state.userEmail}</p>
              {this.state.userEdit && <button onClick={() => this.props.history.push('/editprofile')}>Edit Profile</button>}
              <ProfileLink userEmail={this.state.userEmail}/>
              <SocialMedia userEmail={this.state.userEmail}/>
              <TopStats userEmail={this.state.userEmail}/>
              <PublicPlaylists userEmail={this.state.userEmail}/>
            </div>
          </DefaultLayout>
        </div>
    );
  }    
};

export default withRouter(ProfilePage);
