import React from "react";
import "../index.css";
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
  let bioText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
    "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
  return <p className="body"> {bioText} </p>;
};

export default Biography;
