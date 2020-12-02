import React,{useState} from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';

let userEmail = fb.auth().getCurrentUser.email;

const ProfileLink = () => {
  const [ProfileLink, setProfileLink] = useState("");

  const getProfileLink = async(email) => {
    setProfileLink(await UserService.getProfileLink(email));
  }

  //check if component mounted
  React.useEffect(() => {
    getProfileLink(userEmail);
  }, []);

  return <div id='profilelink'> {ProfileLink} </div>;
};

export default ProfileLink;