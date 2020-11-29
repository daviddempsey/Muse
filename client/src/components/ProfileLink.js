import React, { useState } from 'react';
//import UserService from "../services/user.service";

const ProfileLink = () => {
  // let link = UserService.getProfileLink();
  const [profileLink, setProfileLink] = useState(
    'https://localhost:3000/u/iamsped'
  );

  //check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return <div id='profilelink'> {profileLink} </div>;
};

export default ProfileLink;
