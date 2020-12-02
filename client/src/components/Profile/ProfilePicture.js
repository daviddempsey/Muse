import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';


let userEmail = fb.auth().getCurrentUser.email;

const ProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const getProfilePicture = async (email) => {
    setProfilePicture(await UserService.getProfilePicture(email));
  };

  React.useEffect(() => {
    getProfilePicture(userEmail);
  }, []);

  return (
    <div>
      <img alt='pfp' src={profilePicture} />
    </div>
  );
};

export default ProfilePicture;