import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import Spotify from "../../assets/spotify.png";
import Facebook from "../../assets/fb.png";
import Instagram from "../../assets/ig.png";
import Twitter from "../../assets/twitter.png";
import TikTok from "../../assets/tiktok.png";
import "./index.css";
const auth = fb.auth();

const SocialMedia = ({ userEmail }) => {
  // uncomment userservice once we get it to work.
  const [spotifyLink, setSpotifyLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");

  const getSpotifyLink = async (email) => {
    setSpotifyLink(await UserService.getSpotify(email));
  };

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
      getSpotifyLink(userEmail);
      getFacebookLink(userEmail);
      getInstagramLink(userEmail);
      getTwitterLink(userEmail);
      getTiktokLink(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getSpotifyLink(user.email);
          getFacebookLink(user.email);
          getInstagramLink(user.email);
          getTwitterLink(user.email);
          getTiktokLink(user.email);
        }
      });
    }
  }, [userEmail]);

  return (
    <div>
      {spotifyLink !== "" ? (
        <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
          <img src={Spotify} className="socials" alt="fb" />
        </a>
      ) : null}
      {facebookLink !== "" ? (
        <a
          href={"https://www.facebook.com/" + facebookLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Facebook} className="socials" alt="fb" />
        </a>
      ) : null}
      {instagramLink !== "" ? (
        <a
          href={"https://www.instagram.com/" + instagramLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} className="socials" alt="fb" />
        </a>
      ) : null}
      {twitterLink !== "" ? (
        <a
          href={"https://www.twitter.com/" + twitterLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Twitter} className="socials" alt="fb" />
        </a>
      ) : null}
      {tiktokLink !== "" ? (
        <a
          href={"https://www.tiktok.com/@" + tiktokLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={TikTok} className="socials" alt="fb" />
        </a>
      ) : null}
    </div>
  );
};

export default SocialMedia;
