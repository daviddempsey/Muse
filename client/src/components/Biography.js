import React from 'react';
// import UserService from "../services/user.service";

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/
class Biography extends React.Component {
  //constructor
  constructor(props) {
    super(props);
    // set default state of text element instead text box
    this.state = {
      Biography: 'Tell us a little bit about yourself :)',
    };
  }

  //checks if component mounted
  componentDidMount() {
    this.getBiography();
  }

  getBiography() {
    //var bioText = UserService.getBiography();
    var bioText = 'this is a test';
    this.setState({ Biography: bioText });
  }

  /* render text box*/
  render() {
    return (
      <div>
        <h1>{this.state.Biography}</h1>
      </div>
    );
  }
}

export default Biography;
