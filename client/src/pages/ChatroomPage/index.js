import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import ChatMessage from './ChatMessage';

import firebase from 'firebase/app';
import fb from '../../base';
import 'firebase/firestore';
import 'firebase/auth';
import UserService from '../../services/user.service';

import BttnGraphic from './submit_button.svg';

import { useCollectionData } from 'react-firebase-hooks/firestore';

// const auth = fb.auth();
const firestore = fb.firestore();

const ChatroomPage = (props) => {
  const receiverID = props.match.params.receiver_id;
  const receiverEmail = atob(receiverID);
  // const { email } = auth.currentUser;
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);

  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.where('email', '==', email).where('receiverEmail', '==', receiverEmail);

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
  
  /* get the name of each friend from the database */
  const getName = async (email) => {
    setName(await UserService.getName(email));
  };

  const compare = (msg1, msg2) => {
    if (msg1.createdAt && msg2.createdAt) {
      if (msg1.createdAt.seconds <= msg2.createdAt.seconds) {
        return -1;
      }
      else {
        return 1;
      }
    }
    else return -1;
  }

  let [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { photoURL } = user;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      email,
      receiverEmail,
      photoURL,
      status: "sent"
    })

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      email: receiverEmail,
      receiverEmail: email,
      photoURL,
      status: "received"
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    authUser().then((user) => {
      setEmail(user.email);
      setUser(user);
    })
    getName(receiverEmail);
  }, [])

  if (!user) return null;
  return (
    <div className="Chatroom">
      <header>
        <h2>{name}</h2>
      </header>
      <main>
        {messages && messages.sort(compare).map(msg => <ChatMessage key={msg.id} message={msg} status={msg.status} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit" disabled={!formValue}>
          <img className="BttnImg" src={BttnGraphic} />
        </button>
      </form>
    </div>
  )
}

export default ChatroomPage;
