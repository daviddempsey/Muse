import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserService from '../../../../services/user.service';
import fb from '../../../../base';
import "./index.css";

const MessagingListItem = ({email, receiver}) => {
  const [name, setName] = useState("");
  const [pfp, setPfp] = useState("");
  const [recentMessage, setRecentMessage] = useState("");

  const getName = async (email) => {
    setName(await UserService.getName(email));
  };

  const getPfp = async (email) => {
    setPfp(await UserService.getProfilePicture(email));
  };

  // const getRecentMessage = async (email) => {
  //   setRecentMessage(await UserService.getRecentMessage(fb.auth().currentUser.email, email));
  // }

  useEffect(() => {
    getName(email);
    getPfp(email);
    // getRecentMessage(email);
  });

  return <div className="MessagingListItem" style={{background: receiver === email ? "#e5e5e5" : "#fcfcfc"}}>
    <Link to={"/messages/" + btoa(email)}>
      <div className="padding">
        <div className="pfp">
          <img src={pfp} alt="pfp" />
        </div>
        <div className="text">
          <h2>{name}</h2>
          {/* <p>{recentMessage}</p> */}
        </div>
      </div>
    </Link>
  </div>;
};
export default MessagingListItem;
