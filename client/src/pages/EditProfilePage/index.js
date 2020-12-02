import React, { Component } from 'react';
import UserService from '../../services/user.service';
import './index.css';

import DefaultLayout from '../DefaultLayout';

class EditProfilePage extends Component {
  //constructor
  constructor(props) {
    super(props);
    // set default state of text element instead text box
    this.state = {
      profilePicture: 'breh',
      biography: 'this is the client default bio',
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      twitter: 'https://www.twitter.com',
      tiktok: 'https://www.tiktok.com',
      playlists: ['A', 'B', 'C'],
    };
    //event handlers for when we update text field and submit button
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePFPChange = this.handlePFPChange.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFacebookChange = this.handleFacebookChange.bind(this);
    this.handleInstagramChange = this.handleInstagramChange.bind(this);
    this.handleTikTokChange = this.handleTikTokChange.bind(this);
    this.handleTwitterChange = this.handleTwitterChange.bind(this);
  }

  //checks if component mounted
  componentDidMount() {
    console.log('mounted ;)');
    this.getProfilePicture('cse110tester2@gmail.com');
    this.getBiography('cse110tester2@gmail.com');
    this.getFacebook('cse110tester2@gmail.com');
    this.getInstagram('cse110tester2@gmail.com');
    this.getTwitter('cse110tester2@gmail.com');
    this.getTikTok('cse110tester2@gmail.com');
  }

  // GET STUFF NEEDS TO BE UPDATED WITH USERSERVICE

  getProfilePicture = async (email) => {
    this.setState({
      profilePicture: await UserService.getProfilePicture(email),
    });
  };

  getBiography = async (email) => {
    this.setState({ biography: await UserService.getBiography(email) });
  };

  getFacebook = async (email) => {
    this.setState({ facebook: await UserService.getFacebook(email) });
  };

  getInstagram = async (email) => {
    this.setState({ instagram: await UserService.getInstagram(email) });
  };

  getTwitter = async (email) => {
    this.setState({ twitter: await UserService.getTwitter(email) });
  };

  getTikTok = async (email) => {
    this.setState({ tiktok: await UserService.getTikTok(email) });
  };

  getPlaylists() {
    let playlists = ['A', 'B', 'C'];
    this.setState({ playlists: playlists });
  }

  // SETTERS TO DATABSE

  setProfilePicture = (email) => {
    UserService.setProfilePicture(email, this.state.profilePicture);
  };

  setBiography = (email) => {
    UserService.setBiography(email, this.state.biography);
  };

  setFacebook = (email) => {
    UserService.setFacebook(email, this.state.facebook);
  };

  setInstagram = (email) => {
    UserService.setInstagram(email, this.state.instagram);
  };
  setTwitter = (email) => {
    UserService.setTwitter(email, this.state.twitter);
  };
  setTikTok = (email) => {
    UserService.setTiktok(email, this.state.tiktok);
  };

  // onCHange updates the state
  handlePFPChange(event) {
    this.setState({ profilePicture: event.target.value });
  }

  handleBioChange(event) {
    console.log(event.target.value);
    this.setState({ biography: event.target.value });
  }

  handleFacebookChange(event) {
    console.log(event.target.value);
    this.setState({ facebook: event.target.value });
  }

  handleInstagramChange(event) {
    this.setState({ instagram: event.target.value });
  }

  handleTwitterChange(event) {
    this.setState({ twitter: event.target.value });
  }

  handleTikTokChange(event) {
    this.setState({ tiktok: event.target.value });
  }

  /* event handler for when user hits submit button*/
  // onSubmit updates database once user is done.
  handleSubmit(event) {
    //bioText = this.state.value;
    this.setProfilePicture('cse110tester2@gmail.com');
    this.setBiography('cse110tester2@gmail.com');
    this.setFacebook('cse110tester2@gmail.com');
    this.setInstagram('cse110tester2@gmail.com');
    this.setTwitter('cse110tester2@gmail.com');
    this.setTikTok('cse110tester2@gmail.com');
    this.setProfilePicture('cse110tester2@gmail.com');

    event.preventDefault();
  }

  /* TODO: edit social media, edit profile picture, featured artist and track*/

  /* render text box*/
  render() {
    return (
      <DefaultLayout>
        <form id='edit-profile-form' onSubmit={this.handleSubmit}>
          <div id='pfpicture-form'>
            <label>
              Profile Picture:
              <input
                name='pfpicture'
                type='text'
                value={this.state.profilePicture}
                onChange={this.handlePFPChange}
              />
            </label>
          </div>
          <div id='biography-form'>
            <label>
              Biography:
              <input
                name='biography'
                type='text'
                value={this.state.biography}
                onChange={this.handleBioChange}
              />
            </label>
          </div>
          <div id='socials-form'>
            <div id='facebook-form'>
              <label>
                Facebook:
                <input
                  type='text'
                  value={this.state.facebook}
                  onChange={this.handleFacebookChange}
                />
              </label>
            </div>
            <div id='instagram-form'>
              <label>
                Instagram:
                <input
                  type='text'
                  value={this.state.instagram}
                  onChange={this.handleInstagramChange}
                />
              </label>
            </div>
            <div id='twitter-form'>
              <label>
                Twitter:
                <input
                  type='text'
                  value={this.state.twitter}
                  onChange={this.handleTwitterChange}
                />
              </label>
            </div>
            <div id='tiktok-form'>
              <label>
                TikTok:
                <input
                  type='text'
                  value={this.state.tiktok}
                  onChange={this.handleTikTokChange}
                />
              </label>
            </div>
          </div>
          <div id='playlist-form'>
            <label> Playlists: </label>
            <select
              value={this.state.playlists}
              onChange={this.handleChange}
              multiple
            >
              <option value='$'> $ </option> <option value='T'> T </option>
              <option value='S'> S </option> <option value='L'> L </option>
              <option value='A'> A </option>
            </select>
          </div>
          <input type='submit' value='Submit' />
        </form>
      </DefaultLayout>
    );
  }
}

export default EditProfilePage;
