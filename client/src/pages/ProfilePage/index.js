import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './index.css';
import fb from '../../base';
import 'firebase/auth';
import firebase from 'firebase/app';
import UserService from '../../services/user.service';

import DefaultLayout from '../DefaultLayout';
import ProfilePicture from '../../components/Profile/ProfilePicture';
import Biography from '../../components/Profile/Biography';
import ProfileLink from '../../components/Profile/ProfileLink';
import SocialMedia from '../../components/Profile/SocialMedia';
import TopStats from '../../components/Profile/TopStats';
import PublicPlaylists from '../../components/Profile/PublicPlaylists';
import CopyProfileLink from '../../components/Profile/CopyProfileLink';

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
      friend: false,
      checkingUser: true,
    };

    // console.log(this.state.userEmail);

    this.userEditCompare = this.userEditCompare.bind(this);
    this.friendsCompare = this.friendsCompare.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.authUser = this.authUser.bind(this);
  }

  authUser() {
    return new Promise(function (resolve, reject) {
      fb.auth().onAuthStateChanged(function (user) {
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
          checkingUser: false,
        });
      });
      this.friendsCompare().then((friendsMatch) => {
        this.setState({
          friend: friendsMatch,
        });
      });
    });
  };

  async addFriend() {
    let myEmail = fb.auth().currentUser.email;
    let friendEmail = atob(this.props.match.params.user_email);
    UserService.addFriend(myEmail, friendEmail);

    let friendsDoc = fb.firestore().collection('user').doc(myEmail);
    let friendsList = (await friendsDoc.get()).data()['friends'];
    if (friendsList.includes(friendEmail)) {
      window.location.reload();
    }
  }

  async userEditCompare() {
    let currEmail = fb.auth().currentUser.email;
    if (currEmail === this.state.userEmail) {
      return true;
    }
    return false;
  }

  async friendsCompare() {
    // use firebase to check for friend
    let currentUserEmail = fb.auth().currentUser.email;
    let friendsDoc = fb.firestore().collection('user').doc(currentUserEmail);
    let friendsList = (await friendsDoc.get()).data()['friends'];

    // get curr email
    let currEmail = this.props.match.params.user_email;
    let decodedEmail = atob(currEmail);

    if (friendsList.includes(decodedEmail)) {
      return true;
    }
    return false;
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
            <ProfilePicture userEmail={this.state.userEmail} />
            <Biography userEmail={this.state.userEmail} />
            <p>{this.state.userEmail}</p>
            {!this.state.friend && !this.state.userEdit && <button id='addfriend' onClick={() => this.addFriend()}>Add Friend</button>}
            {this.state.friend && !this.state.userEdit && <button id='dm' onClick={() => this.props.history.push('/messages')}> dm me ;</button>}
            {this.state.userEdit && (<button id='editprofile' onClick={() => this.props.history.push('/editprofile')}>Edit Profile</button>)}
            <ProfileLink userEmail={this.state.userEmail} />
            <SocialMedia userEmail={this.state.userEmail} />
            <TopStats userEmail={this.state.userEmail} />
            <PublicPlaylists userEmail={this.state.userEmail} />
          </div>
        </DefaultLayout>
      </div>
    );
  };
}

export default withRouter(ProfilePage);
