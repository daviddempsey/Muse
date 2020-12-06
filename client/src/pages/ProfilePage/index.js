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
      loggedInEmail: fb.auth().currentUser.email,
    };

    this.userEditCompare = this.userEditCompare.bind(this);
    this.friendsCompare = this.friendsCompare.bind(this);
  }

  componentDidMount = () => {
    let edit = this.userEditCompare(); 
    this.setState({userEdit: edit});
    console.log(edit);
  };

  async userEditCompare() {
    // get state 
    let pageEmail = this.state.userEmail;
    if (fb.auth().currentUser) {
      let currEmail = fb.auth().currentUser.email;
      if (currEmail.localeCompare(pageEmail) === 0) {
        console.log(currEmail);
        return true;
      } 
    } else {
      return await fb.auth().onAuthStateChanged(function (user) {
        if (user) {
          if (user.email.localeCompare(pageEmail)) {
            console.log(user.email);
            return true;
          }
        }
      });
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
    if (this.state.userEdit === false) {
      console.log(this.state.userEdit);
      if(this.friendsCompare()){
        // if user is a friend 
        return (
          <div>
            <div id='profile-page-notme-friend'>
              <DefaultLayout>
                <div id='profile-section'>
                  <ProfilePicture userEmail={this.state.userEmail}/>
                  <p>{this.state.userEmail}</p>
                  <button onClick={() => this.props.history.push('/messages')}>messages</button>
                  <CopyProfileLink/>
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
      } else {
        return (
          <div>
            <div id='profile-page-notme-notfriend'>
              <DefaultLayout>
                <div id='profile-section'>
                  <ProfilePicture userEmail={this.state.userEmail}/>
                  <p>{this.state.userEmail}</p>
                  <CopyProfileLink/>
                  <AddFriend myEmail={this.state.loggedInEmail} friendEmail={this.state.userEmail}/>
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
      }
    } else {
      return (
        <div>
          <div id='profile-page-me'>
            <DefaultLayout>
              <div id='profile-section'>
                <ProfilePicture userEmail={this.state.userEmail}/>
                <button onClick={() => this.props.history.push('/editprofile')}>Edit Profile</button>
                <p>{this.state.userEmail}</p>
                <CopyProfileLink/>
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
    }
    
  };
}

export default withRouter(ProfilePage);
