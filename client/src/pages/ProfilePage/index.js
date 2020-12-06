import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';
import fb from '../../base';
import 'firebase/auth';
import firebase from 'firebase/app';

import DefaultLayout from '../DefaultLayout';
import ProfilePicture from '../../components/Profile/ProfilePicture';
import Biography from '../../components/Profile/Biography';
import ProfileLink from '../../components/Profile/ProfileLink';
import SocialMedia from '../../components/Profile/SocialMedia';
import TopStats from '../../components/Profile/TopStats';
import PublicPlaylists from '../../components/Profile/PublicPlaylists';
import CopyProfileLink from '../../components/Profile/CopyProfileLink';
import AddFriend from '../../components/Profile/AddFriend';

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

  async friendsCompare(){
    // use firebase to check for friend
    let currentUserEmail = fb.auth().currentUser.email;
    let friendsDoc  = fb.firestore().collection("user").doc(currentUserEmail)
    friendsDoc.where("friends", "array-contains", this.state.userEmail);
    // idk what this returns yet and idk if i called it correcctly
    // should return true or false

  }

  // TODO: RENDER IN HARMONY BUTTON
  // also idk if i passed props correctly for addfriend in line 110
  // everything else should work once we figure out logic 
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
