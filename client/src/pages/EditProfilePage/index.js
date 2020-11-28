import React, { Component } from 'react';

class EditProfilePage extends Component {
  //constructor
  constructor(props) {
    super(props);
    // set default state of text element instead text box
    this.state = {
      Biography: 'Edit your biography!',
    };
    //event handlers for when we update text field and submit button
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //checks if component mounted
  componentDidMount() {
    this.getBiography();
  }

  getBiography() {
    //var bioText = UserService.getBiography();
    var bioText = 'place holder for UserService';
    this.setState({ Biography: bioText });
  }

  /*event handler for when our text field changes so we update this.state.value
              and text box to reflect change*/
  /* event handler for when user hits submit button*/
  handleSubmit(event) {
    //bioText = this.state.value;
    this.setState({ Biography: event.target.Biography });
    alert('Stuff is updated updated: ' + this.state.Biography);
    event.preventDefault();
  }
  /* TODO: edit social media, edit profile picture, featured artist and track*/
  
  /* render text box*/
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Biography:
          <textarea value={this.state.Biography} />{' '}
        </label>{' '}
        <input type='submit' value='Submit' />{' '}
      </form>
    );
  }
}

export default EditProfilePage;
