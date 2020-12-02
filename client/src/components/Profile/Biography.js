import React,{useState} from 'react';
import UserService from '../../services/user.service';


/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const Biography = () => {
  // uncomment userservice once we get it to work
  // check if component mounted
  const [bioText, setBio] = useState("");
  
  const getBiography = async(email) => {
    setBio(await UserService.getBiography(email));
  }

  React.useEffect(() => {
    console.log('Component is Mounted');
    getBiography('cse110tester2@gmail.com');
  }, []);
  

  return <div> {bioText} </div>;
};

export default Biography;
