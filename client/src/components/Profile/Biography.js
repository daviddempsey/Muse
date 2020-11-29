import React, { useState } from 'react';
//import UserService from '../services/user.service';

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const Biography = () => {
  // uncomment userservice once we get it to work
  const [bioText, setBioText] = useState('this is a test bio text pls');

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return <div> {bioText} </div>;
};

export default Biography;
