import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import fb from '../../../base';
import '../index.css';

const auth = fb.auth();

const ChatMessage = (props) => {
    const { text, uid, photoURL, status } = props.message;

    const messageClass = status; // styling on whether sent or received
  
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
      </div>
    )
}

export default ChatMessage;