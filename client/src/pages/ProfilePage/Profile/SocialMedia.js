import React, { useState } from 'react';
import UserService from '../../../services/user.service';
import fb from '../../../base';
import 'firebase/auth';
const auth = fb.auth();

const SocialMedia = ({userEmail}) => {
  // uncomment userservice once we get it to work.
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [tiktokLink, setTiktokLink] = useState('');
  const [spotifyLink, setSpotifyLink] = useState('');

  // function to set instagram link
  const getInstagramLink = async (email) => {
    setInstagramLink(await UserService.getInstagram(email));
  };

  // function to set the facebook link
  const getFacebookLink = async (email) => {
    setFacebookLink(await UserService.getFacebook(email));
  };

  // function to set the twitter link
  const getTwitterLink = async (email) => {
    setTwitterLink(await UserService.getTwitter(email));
  };

  // function to set the tiktok link
  const getTiktokLink = async (email) => {
    setTiktokLink(await UserService.getTikTok(email));
  };

  // function to set the spotify link
  const getSpotifyLink = async (email) => {
    setSpotifyLink(await UserService.getSpotify(email));
  };

  // check if component mounted
  React.useEffect(() => {
    getFacebookLink(userEmail);
    getInstagramLink(userEmail);
    getTwitterLink(userEmail);
    getTiktokLink(userEmail);
    getSpotifyLink(userEmail);
  }, [userEmail]);

  return (
    <div id='socialmedia'>
      <h1>My Social Media</h1>
      <a href={facebookLink}> FACEBOOK </a>
      <a href={instagramLink}> INSTAGRAM </a>
      <a href={twitterLink}> TWITTER </a>
      <a href={tiktokLink}> TIKTOK </a>
      <a href={spotifyLink}> SPOTIFY </a>
    </div>
  );
};

export default SocialMedia;
