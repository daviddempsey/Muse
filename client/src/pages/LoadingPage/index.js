import React, { Component } from 'react';
import Cookies from 'js-cookie';
import fb from '../../base';
import { useEffect } from 'react';

const LoadingPage = ({history}) => {

    useEffect(() => {
        handleSignIn();
    })

    const handleSignIn = () => {

        // get token from cookie
        const token = Cookies.get('token');
        
        // try to sign user in 
        // fb.auth().signInWithCustomToken(token).then(history.push("/profile"));

        // attempt to sign in to the application
        fb.auth().signInWithCustomToken(token).then((user) => {
            // Signed in 
            console.log('Signed in successfully');
            console.log('Added', user);

            // redirect
            history.push("/profile");
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            // log the error to the console
            console.log(errorCode, errorMessage);
            alert(errorMessage);
        });
    }

    return(
        <div>
            <p>Spinner should be here</p>
        </div>
    );
}

export default LoadingPage;