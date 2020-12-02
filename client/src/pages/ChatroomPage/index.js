import React, { useRef, useState } from 'react';
import './App.css';
import ChatMessage from './ChatMessage';

import firebase from 'firebase/app';
import fb from '../../base';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = fb.auth();
const firestore = fb.firestore();

const ChatroomPage = (props) => {
  const receiverEmail = props.receiverEmail;
  const { email } = auth.currentUser;

  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.where('email', '==', email).where('receiverEmail', '==', receiverEmail);

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

  let [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { photoURL } = auth.currentUser;

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

  return (
    <>
      <main>
        {messages && messages.sort(compare).map(msg => <ChatMessage key={msg.id} message={msg} status={msg.status} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit" disabled={!formValue}>Submit</button>
      </form>
    </>
  )
}

export default ChatroomPage;
