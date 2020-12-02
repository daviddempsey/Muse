import React,{useState} from 'react';
import UserService from '../../services/user.service';

const ProfileLink = () => {
  const [ProfileLink, setProfileLink] = useState("");

  const getProfileLink = async(email) => {
    setProfileLink(await UserService.getProfileLink(email));
  }

  //check if component mounted
  React.useEffect(() => {
    console.log('Hi');
    getProfileLink('cse110tester2@gmail.com');
  }, [getProfileLink]);

  return <div id='profilelink'> {ProfileLink} </div>;
};

export default ProfileLink;