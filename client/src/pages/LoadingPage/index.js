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
        try {
            fb.auth().signInWithCustomToken(token);
            history.push("/profile");
        } catch (error) {
            alert(error);
        }
    }

    return(
        <div>
            <p>Spinner should be here</p>
        </div>
    );
}

export default LoadingPage;