import React, { useState } from 'react';
import UserService from "../services/user.service";

const ProfileLink = () => {
  let profileLink = UserService.getProfileLink();

  //check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return <div id='profilelink'> {profileLink} </div>;
};

export default ProfileLink;
