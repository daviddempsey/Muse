import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const Biography = () => {
  // uncomment userservice once we get it to work
  // check if component mounted
  const [bioText, setBio] = useState('');
  const [name, setName] = useState('');

  const getBiography = async (email) => {
    setBio(await UserService.getBiography(email));
  };

  const getName = async (email) => {
    setName(await UserService.getName(email));
  }

  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getName(userEmail);
      getBiography(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getName(user.email);
          getBiography(user.email);
        }
      });
    }
  }, []);

  return (
    <div>
      <div id="name">{name}</div>
      <div id='bio'>{bioText}</div>
    </div>
  );
};

export default Biography;