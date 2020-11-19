import React, { Component } from "react";
import UserService from "../services/user.service"


/* view and update a user's friends list */
export default class friendPage extends Component {
    constructor(props) {
        super(props);
        // set default state of friends element to a list containing dict of userEmails
        this.state = { friends: [
            {userEmail: ""},
        ] }

    // event handlers for when we update friends list
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    }

    // function for viewing a friends page
    viewFriend(userEmail) {
        let friend = UserService.getUser(userEmail);
        return friend;
    }

    /* event handler for adding a new friend */
    handleAddFriend (name) {
        console.log("Added " + name);
        // add the friend to the user's friends list
        this.setState((name) => {
            return {
                friends: this.state.friends.concat({ userEmail: name })
            }
        })
    }

    /* event handler for removing a friend */ 
    handleRemoveFriend (name) {
        console.log("Removed " + name);
        // filter out the names excluding the removed user
        this.setState((name) => {          
          return {
              friends: this.state.friends.filter((friend) => friend.userEmail !== name)
          }
        })
    }
  
    /* render the friends list */
    render() {
        const { friends } = this.state;
        return (
            <div>
                <h1>Friend Page</h1>
                {/* lists the friends of the user */}
                {this.state.friends.map((name) => 
                    this.viewFriend(name.userEmail)
                ).join('\n')}; {/* not sure how to have each friend on different line */}
            </div>
        )
    }
}