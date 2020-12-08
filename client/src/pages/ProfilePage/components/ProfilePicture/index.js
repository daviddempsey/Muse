import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import "./index.css";
import "firebase/auth";

const ProfilePicture = ({ userEmail }) => {
  const [profilePicture, setProfilePicture] = useState("");

  const getProfilePicture = async (email) => {
    setProfilePicture(await UserService.getProfilePicture(email));
  };

  React.useEffect(() => {
    getProfilePicture(userEmail);
  }, [userEmail]);

  return (
    <div className="pfpcontainer">
      <img src={profilePicture} className="pfp" alt="pfp" />
    </div>
  );
};

export default ProfilePicture;
