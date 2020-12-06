import React, { useState } from 'react';
import UserService from '../../../services/user.service';
import fb from '../../../base';
import 'firebase/auth';
const auth = fb.auth();

const ProfileLink = ({userEmail}) => {
  const [profileLink, setProfileLink] = useState('');

  const getProfileLink = async (email) => {
    setProfileLink(await UserService.getProfileLink(email));
  };

  //check if component mounted
  React.useEffect(() => {
    if (auth.currentUser) {
      let currEmail = fb.auth().currentUser.email;
      if (currEmail.localeCompare(userEmail) === 0) {
        getProfileLink(currEmail);
      } else {
        getProfileLink(userEmail);
      }
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          if (user.email.localeCompare(userEmail) === 0) {
            getProfileLink(user.email);
          } else {
            getProfileLink(userEmail);
          }
        }
      });
    }
  }, [userEmail]);

  return <div id='profilelink'> {profileLink} </div>;
};

export default ProfileLink;
