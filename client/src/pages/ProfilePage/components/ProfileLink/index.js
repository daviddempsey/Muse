import React from "react";
import Link from "../../assets/link.svg";
import "./index.css";
//import UserService from "../services/user.service";

const ProfileLink = () => {
  // let link = UserService.getProfileLink();
  let link = window.location.href;

  return (
    <div>
      <button
        className="copylink"
        onClick={() => navigator.clipboard.writeText(link)}
      >
        <img src={Link} className="link" alt="link" />
      </button>
    </div>
  );
};

export default ProfileLink;
