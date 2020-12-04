import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState('');
  const [topUserImg, setTopUserImg] = useState('');

  const UserLister = ({ topUsers, topUserImg }) =>
    Object.keys(topUsers).map((item, i) => (
      <li key={i}>
          {/* Open user profile
        <a href={'https://open.spotify.com/user/' + topArtists[item].track_id}>
          */}
        <span>{item}</span>
        <span>   </span>
        <span>{topUsers[item].score}</span>
        <img alt="" src={topUserImg[i]} />
        {/*</a> */}
      </li>
    ));

  const getTopUsers = async (email) => {
    setTopUsers(await UserService.getTopUsers(email));
    setTopUserImg(await UserService.getProfilePictureOfInHarmonyUsers(email));
  };


  // check if component mounted
  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getTopUsers(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getTopUsers(user.email);
        }
      });
    }
  }, []);

  return (
    <div id='userimgs'>
      <UserLister topUsers={topUsers} topUserImg={topUserImg} />
    </div>
  );
};

export default TopUsers;

