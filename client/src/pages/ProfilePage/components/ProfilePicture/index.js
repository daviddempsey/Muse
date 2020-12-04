import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import "firebase/auth";
import "./index.css";

const ProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState("");
  const getProfilePicture = async (email) => {
    setProfilePicture(await UserService.getProfilePicture(email));
  };

  React.useEffect(() => {
    let userEmail = fb.auth().currentUser.email;
    getProfilePicture(userEmail);
  }, []);

  return <img src={profilePicture} className="pfp" alt="pfp" />;
};

export default ProfilePicture;
