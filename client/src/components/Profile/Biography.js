import React from 'react';
//import UserService from '../../services/user.service';

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const Biography = () => {
  // uncomment userservice once we get it to work
  // check if component mounted
  React.useEffect(() => {
    console.log('Component is Mounted');
  }, []);

  return <div> {/* {UserService.getBiography()} */} </div>;
};

export default Biography;
