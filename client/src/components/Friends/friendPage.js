import React, { useState } from 'react';
import UserService from "../../services/user.service";
import {Link} from "react-router-dom";


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
        getfriendsList("cse110spotifytester1@gmail.com");
    }, []);
    
    /* renders the friend page */
    return (
        <div className='friendPage'>
            <h1>Friends</h1>
            <br />
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
    const [pic, setPic] = useState("");
    const [profile, setProfile] = useState("");
    // Need to implement compatibility first
    // const [compatibility, setCompatibility] = useState(0);

    /* get the bio of each friend from the database */
    const getBio = async (email) => {
        setBio(await UserService.getBiography(email));
    };

    /* get the name of each friend from the database */
    const getName = async (email) => {
        setName(await UserService.getUserName(email));
    }

    /* get the profile pic of each friend from the database */
    const getPic = async (email) => {
        setPic(await UserService.getProfilePicture(email));
    }

    /* get the profile of each friend from the database */
    const getProfile = async (email) => {
        setProfile(await UserService.getProfileLink(email));
    }

    // Need to implement compatibility first

    /* get the compatibility of each friend from the database */
    // const getCompatibility = async (email) => {
    //     setCompatibility(await UserService.getCompatibility(email));
    // }

    /* check if component mounted */
    React.useEffect(() => {
        getBio(email);
        getName(email)
        getPic(email);
        getProfile(email);
        // getCompatibility(email);
    });
    
    /* renders each friend with their name, bio, and compatibility to the current user*/
    return (
        <div className="friend">
            <img alt='pro pic not found' src={pic}/>            
            <div className="text">
                <h2>
                    {/* Replace this with the actual profile page */}
                    <Link to={profile} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                        {name}
                    </Link>
                </h2>
            <p>{bio}</p>
            </div>
            <br />
            {/* need to wait for compatibilitiy to be implemented */}
            {/* <h1>{compatibility}</h1> */}
        </div>
    );
};


export default FriendPage;