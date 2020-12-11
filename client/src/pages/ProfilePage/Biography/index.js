import React, { useState } from "react";
import UserService from "../../../services/user.service";
import fb from "../../../base.js";
import "firebase/auth";
import "./index.css";
const auth = fb.auth();

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const Biography = ({ userEmail }) => {
  // uncomment userservice once we get it to work
  // check if component mounted
  const [bioText, setBio] = useState("");

  const getBiography = async (email) => {
    setBio(await UserService.getBiography(email));
  };

  React.useEffect(() => {
    if (auth.currentUser) {
      let currEmail = fb.auth().currentUser.email;
      if (currEmail.localeCompare(userEmail) === 0) {
        getBiography(currEmail);
      } else {
        getBiography(userEmail);
      }
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          if (user.email.localeCompare(userEmail) === 0) {
            getBiography(user.email);
          } else {
            getBiography(userEmail);
          }
        }
      });
    }
  }, [userEmail]);

  return <p className="body">{bioText}</p>;
};

export default Biography;
