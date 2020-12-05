import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const AddFriend = () => {
  // uncomment userservice once we get it to work
  // check if component mounted

  const handleClick = () => {
    //userEmail = fb.auth().currentUser.email;
    console.log("inside click")
    let myEmail = fb.auth().currentUser.email;
    let friendEmail = "johngreen@vlogbrothers.com"
    UserService.addFriend(myEmail, friendEmail);
  }

  React.useEffect(() => {
    if (auth.currentUser) {
    } else {
      auth.onAuthStateChanged(function (user) {
      });
    }
  }, []);

  return (
    <div>
      <button onClick={handleClick}>Add Friend</button>
    </div>
  );
};

export default AddFriend;
