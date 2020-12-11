import React from "react";
import "firebase/auth";
import "../index.css";

const ChatMessage = (props) => {
  const { text, photoURL, status } = props.message;

  const messageClass = status; // styling on whether sent or received

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="profilepicture" />
      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;
