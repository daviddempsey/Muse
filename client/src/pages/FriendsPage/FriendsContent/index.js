import React, { useState } from "react";
import fb from "../../../base";
import UserService from "../../../services/user.service";
import "firebase/auth";
import "./index.css";
import FriendsLister from "./FriendsLister";

const auth = fb.auth();

/* functional component that creates a friends list
 * It calls a child Friends component for each friend */
const FriendsContent = () => {
  const [friendsList, setFriendsList] = useState([]);

  /* get the friends list from the database */
  const getFriendsList = async (email) => {
    setFriendsList(await UserService.getUserFriends(email));
  };

  /* gets the friends list of the current user */
  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getFriendsList(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getFriendsList(user.email);
        }
      });
    }
  }, []);

  /* renders the friend page */
  return (
    <div className="FriendsContent">
        <h1>Friends</h1>
        <div className="FriendsList"> 
          <FriendsLister friendsList={friendsList} />
        </div>
    </div>
  );
};

export default FriendsContent;