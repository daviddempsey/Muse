import React, { Component } from 'react';

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
    };
    //event handlers for when we update text field and submit button
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //checks if component mounted
  componentDidMount() {
    console.log('mounted ;)');
    this.getBiography();
    this.getFacebook();
    this.getInstagram();
    this.getTwitter();
  }

  // GET STUFF NEEDS TO BE UPDATED WITH USERSERVICE

  getBiography() {
    //var bioText = UserService.getBiography();
    let bioText = 'place holder for UserService';
    this.setState({ Biography: bioText });
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

  /* event handler for when user hits submit button*/
  handleSubmit(event) {
    //bioText = this.state.value;
    this.setState({ Biography: event.target.Biography });
    alert('Stuff is updated updated');
    event.preventDefault();
  }
  /* TODO: edit social media, edit profile picture, featured artist and track*/

  /* render text box*/
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div id='biography'>
          <label>
            Biography:
            <textarea value={this.state.Biography} />{' '}
          </label>{' '}
        </div>
        <div id='socials'>
          <div id='facebook'>
            <label>
              Facebook:
              <textarea value={this.state.facebook} />{' '}
            </label>{' '}
          </div>
          <div id='instagram'>
            <label>
              Instagram:
              <textarea value={this.state.instagram} />{' '}
            </label>{' '}
          </div>
          <div id='twitter'>
            <label>
              Twitter:
              <textarea value={this.state.twitter} />{' '}
            </label>{' '}
          </div>
        </div>
        <input type='submit' value='Submit' />{' '}
      </form>
    );
  }
}

export default EditProfilePage;
