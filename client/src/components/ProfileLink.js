import React from 'react';
//import UserService from "../services/user.service";

const ProfileLink = () => {
  // let link = UserService.getProfileLink();
  //check if component mounted
  React.useEffect(()=> {
    console.log("Hi");
  }, []); 

  let link = 'https://muse.com/test_text';
  return <div> {link} </div>;
};

export default ProfileLink;
