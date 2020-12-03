import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const ProfileLink = () => {
  const [ProfileLink, setProfileLink] = useState('');

  const getProfileLink = async (email) => {
    setProfileLink(await UserService.getProfileLink(email));
  };

  //check if component mounted
  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getProfileLink(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getProfileLink(user.email);
        }
      });
    }
  }, []);

  return <div id='profilelink'> {ProfileLink} </div>;
};

export default ProfileLink;
