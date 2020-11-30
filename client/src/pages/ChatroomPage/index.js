import React, { Component } from 'react';
// import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

class ChatroomPage extends Component {
  constructor(props) {
    super(props);
    this.messagesRef = firestore.collection('messages');
    this.query = messagesRef.orderBy('createdAt').limit(25);
    this.messages = useCollectionData(query, {idField: 'id'});
    
    this.state = {
      formValue: ''
    };

  }

  sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
  }

  render = () => {
    return (
      <>
        <div>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>

        <form onSubmit={sendMessage}>
          <input value={formValue} onChange={(e) => setState({formValue: e.target.value})} />
          <button type="submit">Submit</button>
        </form>
      </>
    );
  }
}

export default ChatroomPage;
