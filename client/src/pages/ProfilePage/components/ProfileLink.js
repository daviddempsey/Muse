import React from "react";
import Link from "../assets/copylink.png";
import "./index.css";
//import UserService from "../services/user.service";

const ProfileLink = () => {
  // let link = UserService.getProfileLink();
  //check if component mounted
  React.useEffect(() => {
    console.log("Hi");
  }, []);

  let link = "https://muse.com/test_text";
  return (
    <a href={link}>
      <img src={Link} className="copylink" alt="link" />
    </a>
  );
};

export default ProfileLink;
