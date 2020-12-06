import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const ProfilePicture = ({userEmail}) => {
  const [profilePicture, setProfilePicture] = useState('');

  const getProfilePicture = async (email) => {
    setProfilePicture(await UserService.getProfilePicture(email));
  };

  React.useEffect(() => {
    getProfilePicture(userEmail);
  }, [userEmail]);

  return (
    <div>
      <img alt='pfp' src={profilePicture} />
    </div>
  );
};

export default ProfilePicture;
