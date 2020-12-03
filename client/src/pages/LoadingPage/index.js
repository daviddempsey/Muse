import React, { Component } from 'react';
import Cookies from 'js-cookie';
import fb from '../../base';
import 'firebase/auth';
import { useEffect } from 'react';

const auth = fb.auth();

const LoadingPage = ({history}) => {

    useEffect(() => {
        handleSignIn();
    })

    const handleSignIn = async() => {

        // get token from cookie
        const token = Cookies.get('token');

        // attempt to sign in to the application
        fb.auth().signInWithCustomToken(token).then((user) => {
            // redirect
            history.push("/profile");
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            // log the error to the console
            alert(errorMessage);
        });
    }

    return(
        <div>
            <p>Please Wait while we sign you in!</p>
        </div>
    );
}

export default LoadingPage;