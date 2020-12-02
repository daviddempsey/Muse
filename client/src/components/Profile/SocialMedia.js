import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base'

let userEmail = fb.auth().getCurrentUser.email;

const SocialMedia = () => {
  // uncomment userservice once we get it to work.
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [tiktokLink, setTiktokLink] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");

  const getInstagramLink = async(email) => {
    setInstagramLink(await UserService.getInstagram(email));
  }

  const getFacebookLink = async(email) => {
    setFacebookLink(await UserService.getFacebook(email));
  }

  const getTwitterLink = async(email) => {
    setTwitterLink(await UserService.getTwitter(email));
  }

  const getTiktokLink = async(email) => {
    setTiktokLink(await UserService.getTikTok(email));
  }

  const getSpotifyLink = async(email) => {
    setSpotifyLink(await UserService.getSpotify(email));
  }

  // check if component mounted
  React.useEffect(() => {
    getFacebookLink(userEmail);
    getInstagramLink(userEmail);
    getTwitterLink(userEmail);
    getTiktokLink(userEmail);
    getSpotifyLink(userEmail);
  }, []);


  return (
    <div id='socialmedia'>
      <h1> Hello Social Media </h1>
      <a href={facebookLink}> FACEBOOK </a>
      <a href={instagramLink}> INSTAGRAM </a>
      <a href={twitterLink}> TWITTER </a>
      <a href={tiktokLink}> TIKTOK </a>
      <a href={spotifyLink}> SPOTIFY </a>
    </div>
  );
};

export default SocialMedia;
