import React, { Component } from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';

class EditProfilePage extends Component {
  //constructor
  constructor(props) {
    super(props);
    // set default state of text element instead text box
    this.state = {
      Biography: 'Edit your biography!',
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      twitter: 'https://www.twitter.com',
      playlists: ['A', 'B', 'C']
    };
    //event handlers for when we update text field and submit button
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidCatch = this.componentDidCatch.bind(this);
  }

  //checks if component mounted
  componentDidMount() {
    console.log('mounted ;)');
    this.getBiography();
    this.getFacebook();
    this.getInstagram();
    this.getTwitter();
    this.getPlaylists();
  }

  // GET STUFF NEEDS TO BE UPDATED WITH USERSERVICE

  getBiography() {
    //var bioText = UserService.getBiography();
    let bioText = 'place holder for UserService';
    this.setState({ biography: bioText });
  }

  getFacebook() {
    let facebookURL = 'https://www.facebook.com/';
    this.setState({ facebook: facebookURL });
  }

  getInstagram() {
    let instagramURL = 'https://www.instagram.com';
    this.setState({ instagram: instagramURL });
  }

  getTwitter() {
    let twitterURL = 'https://www.twitter.com';
    this.setState({ twitter: twitterURL });
  }

  getPlaylists() {
    let playlists = ['A', 'B', 'C'];
    this.playlists({ playlists: playlists });
  }

  // onCHange updates the state
  handleChange(event) {
    this.setState({ biography: event.target.biography });
    this.setState({ facebook: event.target.facebook });
    this.setState({ twitter: event.target.twitter });
    this.setState({ instagram: event.target.instagram });
  }

  /* event handler for when user hits submit button*/
  // onSubmit updates database once user is done.
  handleSubmit(event) {
    //bioText = this.state.value;
    alert('Stuff is updated' + this.state.Biography + this.state.facebook);
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
                type='text'
                value={this.state.biography}
                onChange={this.handleChange}
              />{' '}
            </label>{' '}
          </div>
          <div id='socials-form'>
            <div id='facebook-form'>
              <label>
                Facebook:
                <input
                  type='text'
                  value={this.state.facebook}
                  onChange={this.handleChange}
                />{' '}
              </label>{' '}
            </div>
            <div id='instagram-form'>
              <label>
                Instagram:
                <input
                  type='text'
                  value={this.state.instagram}
                  onChange={this.handleChange}
                />{' '}
              </label>{' '}
            </div>
            <div id='twitter-form'>
              <label>
                Twitter:
                <input
                  type='text'
                  value={this.state.twitter}
                  onChange={this.handleChange}
                />{' '}
              </label>{' '}
            </div>
          </div>
          <div id='playlist-form'>
            <label> Playlists: </label>
            <select value={this.state.playlists}
                  onChange={this.handleChange} multiple>
              <option value='$'>$</option>
              <option value='T'>T</option>
              <option value='S'>S</option>
              <option value='L'>L</option>
              <option value='A'>A</option>
            </select>
          </div>
          <input type='submit' value='Submit' />{' '}
        </form>
      </DefaultLayout>
    );
  }
}

export default EditProfilePage;
