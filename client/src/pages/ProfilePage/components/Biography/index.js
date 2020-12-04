import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import "firebase/auth";
import "./index.css";

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
    let userEmail = fb.auth().currentUser.email;
    getBiography(userEmail);
  }, []);

  return <p className="body"> {bioText} </p>;
};

export default Biography;
