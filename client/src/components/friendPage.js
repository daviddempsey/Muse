import React, { useState } from 'react';
import UserService from "../services/user.service";

/* functional component that creates a friends list
 * It calls a child Friends component for each friend */
const FriendPage = () => {    
    const [friendsList, setFriendsList] = useState([]);
    
    /* calls on a Friend component for each friend in the user's friendsList */
    const Friends = ({ friendsList }) =>
        Object.values(friendsList).map((email, i) => (
            <ul key={i}>
                <Friend email={email} />
            </ul>
        ));

    /* get the friends list from the database */
    const getfriendsList = async (email) => {
        setFriendsList(await UserService.getUserFriends(email));
    };

    /* gets the friends list of the current user */
    React.useEffect(() => {
        getfriendsList('cse110spotifytester1@gmail.com');
    }, []);
    
    /* renders the friend page */
    return (
        <div id='friendPage'>
            <h1>Friends Page</h1>
            <Friends friendsList={friendsList} />
        </div> 
    );
};

/* functional child component that creates a friend 
 * Used to create the parts of each friend in the friends list */
const Friend = ({ email }) => {
    /* store and set the bio for each friend */
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");

    /* get the bio of each friend from the database */
    const getBio = async (email) => {
        setBio(await UserService.getBiography(email));
        // const checkBio = await UserService.getBiography(email);
        // setBio(checkBio !== undefined ? checkBio : "I have not written my biography yet!");
    };

    /* get the name of each friend from the database */
    const getname = async (email) => {
        setName(await UserService.getUserName(email));
    }

    /* check if component mounted */
    React.useEffect(() => {
        getBio(email);
        getname(email);
    });
    
    /* renders each friend with their name, bio, and compatibility to the current user*/
    return (
        <div id={email}>
            <h2>{name}</h2>
            <p>{bio}</p>
            {/* need to wait for compatibilitiy to be implemented */}
            {/* <h3>{compatibility}</h3> */}
        </div>
    );
};


export default FriendPage;