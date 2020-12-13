import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import fb from '../../base';
import "firebase/auth";
import "./index.css";
import DefaultLayout from "../DefaultLayout";

//const auth = fb.auth();

const MessagesLoadingPage = ({ history }) => {
  const [loading, setLoading] = useState(true);

  /* get the friends list from the database */
  const getFriendsList = async (email) => {
    return await UserService.getUserFriends(email);
  };


  const checkMessages = (friends) => {
    if (friends.length > 0) {
      console.log(friends);
      const firstFriendEmail = friends[0];
      const encodedEmail = btoa(firstFriendEmail);
      console.log(firstFriendEmail);
      history.push('/messages/' + encodedEmail);
    }
  }

  useEffect(() => {
    getFriendsList(fb.auth().currentUser.email).then((friends) => {
      checkMessages(friends);
      setLoading(false);
    })
  });

  if (loading) return null;
  return (
    <DefaultLayout>
      <div className="loading">
        <h1>Add a friend to send messages!</h1>
      </div>
    </DefaultLayout>
  );
};

export default MessagesLoadingPage;