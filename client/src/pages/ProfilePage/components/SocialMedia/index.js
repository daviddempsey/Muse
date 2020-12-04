import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import Facebook from "../../assets/fb.png";
import Instagram from "../../assets/ig.png";
import Twitter from "../../assets/twitter.png";
import TikTok from "../../assets/tiktok.png";
import "./index.css";
const auth = fb.auth();

const SocialMedia = () => {
  // uncomment userservice once we get it to work.
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");

  const getInstagramLink = async (email) => {
    setInstagramLink(await UserService.getInstagram(email));
  };

  const getFacebookLink = async (email) => {
    setFacebookLink(await UserService.getFacebook(email));
  };

  const getTwitterLink = async (email) => {
    setTwitterLink(await UserService.getTwitter(email));
  };

  const getTiktokLink = async (email) => {
    setTiktokLink(await UserService.getTikTok(email));
  };

  // check if component mounted
  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getFacebookLink(userEmail);
      getInstagramLink(userEmail);
      getTwitterLink(userEmail);
      getTiktokLink(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getFacebookLink(user.email);
          getInstagramLink(user.email);
          getTwitterLink(user.email);
          getTiktokLink(user.email);
        }
      });
    }
  }, []);

  return (
    <div>
      <a href={facebookLink}>
        <img src={Facebook} className="socials" alt="fb" />
      </a>
      <a href={instagramLink}>
        <img src={Instagram} className="socials" alt="ig" />
      </a>
      <a href={twitterLink}>
        <img src={Twitter} className="socials" alt="twitter" />
      </a>
      <a href={tiktokLink}>
        <img src={TikTok} className="socials" alt="tiktok" />
      </a>
    </div>
  );
};

export default SocialMedia;
