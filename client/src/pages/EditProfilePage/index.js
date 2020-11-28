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
      featuredArtist: 'Keshi',
      featuredTrack: '2soon',
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
    this.getFeaturedArtist();
    this.getFeaturedTrack();
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
  getFeaturedArtist(){
    //let featured_artist = UserService.getFeaturedArtist();
    let featured_artist = 'keshi';
    this.setState({featuredArtist: featured_artist})

  }
  getFeaturedTrack(){
    //let featured_track = UserService.getFeaturedArtist();
    let featured_track = '2soon';
    this.setState({featuredTrack: featured_track})
  }


  // onCHange updates the state 
  handleChange(event){
    this.setState({biography: event.target.biography});
    this.setState({facebook:event.target.facebook});
    this.setState({twitter: event.target.twitter});
    this.setState({instagram: event.target.instagram});
    this.setState({featuredArtist: event.target.featured_artist});
    this.setState({featuredTrack: event.target.featured_track});
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
      <form id= 'edit-profile-form' onSubmit={this.handleSubmit}>
        <div id='biography-form'>
          <label>
            Biography:
            <input type="text" value={this.state.biography} onChange={this.handleChange}/>{' '}
          </label>{' '}
        </div>
        <div id='socials-form'>
          <div id='facebook-form'>
            <label>
              Facebook:
              <input type="text" value={this.state.facebook} onChange={this.handleChange}/>{' '}
            </label>{' '}
          </div>
          <div id='instagram-form'>
            <label>
              Instagram:
              <input type="text" value={this.state.instagram} onChange={this.handleChange} />{' '}
            </label>{' '}
          </div>
          <div id='twitter=form'>
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
