import React, { Component } from 'react';
// import UserService from '../services/user.service';

export default class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    // this.onChangePicture = this.onChangePicture.bind(this);

    this.state = {
      url: '',
    };
  }

  componentDidMount() {
    this.getProfilePicture();
  }

  getProfilePicture() {
    // let profilePictureURL = UserService.getProfilePicture();
    // this.setState({ url: profilePictureURL });
  }

  onChangePicture(e) {
    this.setState({
      url: e.target.value,
    });
  }

  savePicture() {
    /*UserService.update({ profile_picture: this.state.url })
          .then(() => {
            console.log('Uploaded new picture successfully!');
          })
          .catch((e) => {
            console.log(e);
          });*/
  }

  render() {
    return (
      <img src={this.state.url} />
      // write form code to upload and set new profile picture
    );
  }
}
