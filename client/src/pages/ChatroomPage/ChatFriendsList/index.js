import React, { useEffect, useState } from 'react';
import UserService from "../../services/user.service";
import fb from "../../base";
import "firebase/auth";
const auth = fb.auth();

const ChatFriendsList = () => {
    const [chatFriendsList, setChatFriendsList] = useState([]);

    /* calls on a Friend component for each friend in the user's friendsList */
    const Friends = ({ friendsList }) =>
      Object.values(friendsList).map((email, i) => (
        <ul key={i}>
          <Friend email={email} />
        </ul>
      ));
  
    /* get the friends list from the database */
    const getChatFriendsList = async (email) => {
      setChatFriendsList(await UserService.getUserFriends(email));
    };

    const authUser = () => {
        return new Promise(function (resolve, reject) {
          fb.auth().onAuthStateChanged(function (user) {
            if (user) {
              resolve(user);
            } else {
              reject('User not logged in');
            }
          });
        });
      }
  
    /* gets the friends list of the current user */
    useEffect(() => {
      authUser.then((user) => {
        let userEmail = user.email;
        getChatFriendsList(userEmail);
      });
    }, []);
  
    /* renders the friend page */
    if (!user) return null;
    return (
      <div className="friendPage">
        <h1>Friends</h1>
        <br />
        <Friends friendsList={chatFriendsList} />
      </div>
    );
  };