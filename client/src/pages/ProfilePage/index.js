import React, { Component } from 'react';
import Cookies from 'js-cookie';
import fb from '../../base';
import 'firebase/auth';

const auth = fb.auth();

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseToken: Cookies.get('token')
    };
    console.log("OH HELLO, TERMINAL", Cookies.get('token'));
  }

  componentDidMount = () => {};

  render = () => {
    return (
      <div>
        <p>{Cookies.get('token')}</p>
        <p>{auth.currentUser.email}</p>
      </div>
    );
  };
}

export default ProfilePage;
