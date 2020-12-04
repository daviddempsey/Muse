import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import "firebase/auth";
import "./index.css";
const auth = fb.auth();

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const Biography = () => {
  // uncomment userservice once we get it to work
  // check if component mounted
  const [bioText, setBio] = useState("");

  const getBiography = async (email) => {
    setBio(await UserService.getBiography(email));
  };

  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getBiography(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getBiography(user.email);
        }
      });
    }
  }, []);

  return <p className="body"> {bioText} </p>;
};

export default Biography;
