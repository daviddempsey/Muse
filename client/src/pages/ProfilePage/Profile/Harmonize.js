/*import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

/*const Harmonize = () => {
  // uncomment userservice once we get it to work
  // check if component mounted

  const handleClick = () => {
    //userEmail = fb.auth().currentUser.email;
    console.log("inside click")
    let myEmail = fb.auth().currentUser.email;
    let friendEmail = "johngreen@vlogbrothers.com"
    // replace with userservice get harmonized call
    const score = UserService.addFriend(myEmail, friendEmail);
    // if call returns null or undefined then need to calculate score and add to list
    if (score === null){
        // calculate score
        //update to list
        score = call in harmony calculation here 
        UserService.updateHamorny(myEmail, otherUserEmail, score);
    }
  }

  React.useEffect(() => {
    if (auth.currentUser) {
    } else {
      auth.onAuthStateChanged(function (user) {
      });
    }
  }, []);
// need to change from button view to outputted score view
  return (
    <div>
      <button onClick={handleClick}>Harmonize</button>
    </div>
  );
};

export default Harmonize; */
