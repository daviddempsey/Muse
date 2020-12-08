import React from "react";
import Friend from "../Friend";

 /* calls on a Friend component for each friend in the user's friendsList */
 const FriendsLister = ({ friendsList }) =>
    Object.values(friendsList).map((email, i) => (
        <li key={i}>
            <Friend email={email} />
        </li>
    ));

export default FriendsLister;