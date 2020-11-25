import React from "react";
import "./index.css";
//import UserService from '../services/user.service';

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

const Biography = () => {
  // uncomment userservice once we get it to work.
  //let bioText = UserService.getBiography();
  // check if component mounted
  React.useEffect(() => {
    console.log("Hi");
  }, []);
  let bioText = "Bio";
  return <div> {bioText} </div>;
};

export default Biography;
