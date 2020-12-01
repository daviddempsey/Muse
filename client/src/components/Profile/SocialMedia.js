import React from 'react';
import UserService from '../../services/user.service';

const SocialMedia = () => {
  // uncomment userservice once we get it to work.
  let facebookLink = UserService.getFacebook('cse110tester2@gmail.com');
  let instagramLink = UserService.getInstagram('cse110tester2@gmail.com');
  let twitterLink = UserService.getTwitter('cse110tester2@gmail.com');
  let tiktokLink = UserService.getTikTok('cse110tester2@gmail.com');

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div id='socialmedia'>
      <h1> Hello Social Media </h1>
      <a href={facebookLink}> FACEBOOK </a>{' '}
      <a href={instagramLink}> INSTAGRAM </a>{' '}
      <a href={twitterLink}> TWITTER </a>
      <a href={tiktokLink}> TIKTOK </a>{' '}
    </div>
  );
};

export default SocialMedia;
