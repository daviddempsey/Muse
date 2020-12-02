import React, { useState } from 'react';
import UserService from '../../services/user.service';

const ProfilePicture = () =>{
  const [profilePicture, setProfilePicture] = useState("");
  const getProfilePicture = async(email) => {
    setProfilePicture(await UserService.getProfilePicture(email));
  }
  
  React.useEffect(() => {
    console.log('Component is Mounted');
    getProfilePicture('cse110tester2@gmail.com');
  }, []);

  return <div>
    <img src={profilePicture} />
    </div>
}

export default ProfilePicture;