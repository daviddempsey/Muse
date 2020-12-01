import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

const ChatMessage = (props) => {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'; // styling on whether sent or received
  
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    )
}

export default ChatMessage;