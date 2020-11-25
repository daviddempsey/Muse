import React from 'react';
import userservice from '../services/user.service';

/*update a user's biography.
  Current functionality: basic text element with a save button to 
  handle updating firestore database in the future*/

 
export function Biography() {
    let bioText = userservice.getBiography();
    return <div>{bioText}</div>
};
