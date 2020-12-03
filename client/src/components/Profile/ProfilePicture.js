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

  const antirefresh = async () => {
    console.log("INSIDEe");
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("TOP");
        console.log(user.email);
        getProfilePicture(user.email);
      }
      else {
        console.log("bottom");
      }
    });
  }

  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      console.log("PENIS");
      console.log(userEmail);
      getProfilePicture(userEmail);
    }
    else {
      console.log("dont exist for now");
      antirefresh();
    }
  }, []);

  return (
    <div>
      <img alt='pfp' src={profilePicture} />
    </div>
  );
};

export default ProfilePicture;
