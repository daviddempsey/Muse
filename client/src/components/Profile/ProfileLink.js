import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';

const ProfileLink = () => {
  const [ProfileLink, setProfileLink] = useState('');

  const getProfileLink = async (email) => {
    setProfileLink(await UserService.getProfileLink(email));
  };

  //check if component mounted
  React.useEffect(() => {
    let userEmail = fb.auth().currentUser.email;
    getProfileLink(userEmail);
  }, []);

  return <div id='profilelink'> {ProfileLink} </div>;
};

export default ProfileLink;
