import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';

const ProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const getProfilePicture = async (email) => {
    setProfilePicture(await UserService.getProfilePicture(email));
  };

  React.useEffect(() => {
    let userEmail = fb.auth().currentUser.email;
    getProfilePicture(userEmail);
  }, []);

  return (
    <div>
      <img alt='pfp' src={profilePicture} />
    </div>
  );
};

export default ProfilePicture;
