import React, { Component } from 'react';
//import UserService from "../services/user.service";

class SocialMedia extends Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
      userid: '12345',
      facebook: 'https://www.facebook.com',
      instagram: 'https://www.instagram.com',
      twitter: 'https://www.twitter.com',
    };
  }
  // render functionn
  render() {
    return (
      <div>
        <h1> Hello Social Media </h1>{' '}
        <a href={this.state.facebook}> FACEBOOK </a>{' '}
        <a href={this.state.instagram}> INSTAGRAM </a>{' '}
        <a href={this.state.twitter}> TWITTER </a>{' '}
      </div>
    );
  }
}

export default SocialMedia;
