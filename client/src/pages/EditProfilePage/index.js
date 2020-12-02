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
      biography: 'this is the client default bio',
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      twitter: 'https://www.twitter.com',
      tiktok: 'https://www.tiktok.com',
      playlists: ['A', 'B', 'C'],
    };
    //event handlers for when we update text field and submit button
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBioChange = this.handleBioChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  //checks if component mounted
  componentDidMount() {
    console.log('mounted ;)');
    this.getBiography('cse110tester2@gmail.com');
    this.getFacebook('cse110tester2@gmail.com');
    this.getInstagram('cse110tester2@gmail.com');
    this.getTwitter('cse110tester2@gmail.com');
    this.getTikTok('cse110tester2@gmail.com');
  }

  // GET STUFF NEEDS TO BE UPDATED WITH USERSERVICE

  getBiography = async (email) => {
    this.setState({biography: await UserService.getBiography(email)});
  }

  getFacebook = async (email) => {
    this.setState({facebook: await UserService.getFacebook(email)});
  }

  getInstagram = async (email) => {
    this.setState({instagram: await UserService.getInstagram(email)});
  }

  getTwitter = async (email) => {
    this.setState({twitter: await UserService.getTwitter(email)});
  }

  getTikTok = async (email) => {
    this.setState({tiktok: await UserService.getTikTok(email)});
  }

  getPlaylists() {
    let playlists = ['A', 'B', 'C'];
    this.setState({ playlists: playlists });
  }

  setBiography = (email) => {
      console.log("PENIS HERE");
      console.log(this.state.biography);
      UserService.setBiography(email, this.state.biography);
  }

  // onCHange updates the state
  handleBioChange(event) {
    console.log(event.target.value);
    this.setState({ biography: event.target.value});
  }

  /* event handler for when user hits submit button*/
  // onSubmit updates database once user is done.
  handleSubmit(event) {
    //bioText = this.state.value;
    this.setBiography('cse110tester2@gmail.com');
    event.preventDefault();
  }

  /* TODO: edit social media, edit profile picture, featured artist and track*/

  /* render text box*/
  render() {
    return (
      <DefaultLayout>
        <form id='edit-profile-form' onSubmit={this.handleSubmit}>
          <div id='biography-form'>
            <label>
              Biography:
              <input
                name ='biography'
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
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div id='instagram-form'>
              <label>
                Instagram:
                <input
                  type='text'
                  value={this.state.instagram}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div id='twitter-form'>
              <label>
                Twitter:
                <input
                  type='text'
                  value={this.state.twitter}
                  onChange={this.handleChange}
                />
              </label>
            </div>
            <div id='tiktok-form'>
              <label>
                TikTok:
                <input
                  type='text'
                  value={this.state.tiktok}
                  onChange={this.handleChange}
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
