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
    this.handleChange = this.handleChange.bind(this);
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

  // onCHange updates the state 
  handleChange(event){
    this.setState({biography: event.target.biography});
    this.setState({facebook:event.target.facebook});
    this.setState({twitter: event.target.twitter});
    this.setState({instagram: event.target.instagram});
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
      <form onSubmit={this.handleSubmit}>
        <div id='biography'>
          <label>
            Biography:
            <input type="text" value={this.state.biography} onChange={this.handleChange}/>{' '}
          </label>{' '}
        </div>
        <div id='socials'>
          <div id='facebook'>
            <label>
              Facebook:
              <input type="text" value={this.state.facebook} onChange={this.handleChange}/>{' '}
            </label>{' '}
          </div>
          <div id='instagram'>
            <label>
              Instagram:
              <input type="text" value={this.state.instagram} onChange={this.handleChange} />{' '}
            </label>{' '}
          </div>
          <div id='twitter'>
            <label>
              Twitter:
              <input type="text" value={this.state.twitter} onChange={this.handleChange}/>{' '}
            </label>{' '}
          </div>
        </div>
        <input type="submit" value="Submit" />{' '}
      </form>
    );
  }
}

export default EditProfilePage;
