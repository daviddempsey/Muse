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
    };

    this.userEditCompare = this.userEditCompare.bind(this);
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


  render = () => {
    if (this.state.userEdit === false) {
      console.log(this.state.userEdit);
      return (
        <div>
          <div id='profile-page'>
            <DefaultLayout>
              <div id='profile-section'>
                <ProfilePicture userEmail={this.state.userEmail}/>
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
    } else {
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
    }
    
  };
}

export default withRouter(ProfilePage);
