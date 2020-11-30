import React from "react";
import UserService from "../services/user.service"

/* Make friends list a functional component
 * Have a friendsPage component that 

/* view and a user's friends list */
export default function friendPage() {
    // get the friends list from the database

    // need user.service to work first
    // let friendsList = UserService.getFriends();
    let friendsList = ["Enoch", "Jason", "David", "Kenny"];

    

    const friends = friendsList.map((email, compatibility) => {
        return <li><Friend email={email, compatibility}/></li>
    });
    
    return (
        <div>
            {friends}
        </div> 
    )
}

function Friend({ email, compatibility }) {
    return (
        <div>
            <h2>{UserService.getUser(email)}</h2>
            <p>{UserService.getBiography(email)}</p>
            <h3>{compatibility}</h3>
        </div>
    );
};
