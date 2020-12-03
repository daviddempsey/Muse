import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const ProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState('');

  const getProfilePicture = async (email) => {
    setProfilePicture(await UserService.getProfilePicture(email));
  };

  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getProfilePicture(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getProfilePicture(user.email);
        }
      });
    }
  }, []);

  return (
    <div>
      <img alt='pfp' src={profilePicture} />
    </div>
  );
};

export default ProfilePicture;
