import React, { useState } from 'react';
//import UserService from "../services/user.service";

const SocialMedia = () => {
  // uncomment userservice once we get it to work.
  const [facebook, setFacebook] = useState('https://www.facebook.com');
  const [instagram, setInstagram] = useState('https://www.instagram.com');
  const [twitter, setTwitter] = useState('https://www.twitter.com');
  const [tiktok, setTikTok] = useState('https://www.tiktok.com');

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div id='socialmedia'>
      <h1> Hello Social Media </h1> <a href={facebook}> FACEBOOK </a>{' '}
      <a href={instagram}> INSTAGRAM </a> <a href={twitter}> TWITTER </a>{' '}
      <a href={tiktok}> TIKTOK </a>{' '}
    </div>
  );
};

export default SocialMedia;
