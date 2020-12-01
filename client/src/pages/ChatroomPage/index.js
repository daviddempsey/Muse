import React, { useRef, useState } from 'react';
// import './App.css';
import ChatMessage from './ChatMessage';

import fb from '../../base';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = fb.auth();
const firestore = fb.firestore();

const ChatroomPage = () => {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: fb.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default ChatroomPage;
