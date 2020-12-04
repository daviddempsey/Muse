import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import Link from "../../assets/link.svg";
import fb from "../../../../base.js";
import "./index.css";
const auth = fb.auth();

const ProfileLink = () => {
  const [ProfileLink, setProfileLink] = useState("");

  const getProfileLink = async (email) => {
    setProfileLink(await UserService.getProfileLink(email));
  };

  //check if component mounted
  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getProfileLink(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getProfileLink(user.email);
        }
      });
    }
  }, []);

  //let link = window.location.href;

  return (
    <div>
      <button
        className="copylink"
        onClick={() => navigator.clipboard.writeText(ProfileLink)}
      >
        <img src={Link} className="link" alt="link" />
      </button>
    </div>
  );
};

export default ProfileLink;
