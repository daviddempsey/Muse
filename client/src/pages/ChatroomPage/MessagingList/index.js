import React, {useState, useEffect} from "react";
import fb from "../../../base";
import UserService from "../../../services/user.service";
import "firebase/auth";
import "./index.css";

import MessagingListItem from './MessagingListItem';

const auth = fb.auth();

const MessagingList = ({receiver}) => {
  const [friendsList, setFriendsList] = useState([]);

  const getFriendsList = async (email) => {
    setFriendsList(await UserService.getUserFriends(email));
  };

  /* gets the friends list of the current user */
  useEffect(() => {
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

  return <div className="MessagingList">
    {Object.values(friendsList).map((email, i) => (
      <li key={i}>
          <MessagingListItem email={email} receiver={receiver}/>
      </li>
    ))}
  </div>;
};
export default MessagingList;
