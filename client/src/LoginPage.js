import firebase from "firebase";

// attempt to sign in to the application
firebase.auth().signInWithCustomToken(token).then((user) => {
    // Signed in 
    console.log('Signed in successfully');

    
    console.log('Added', res);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    // log the error to the console
    console.log(errorCode, errorMessage);
  });