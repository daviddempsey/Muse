import React, { Component } from 'react';
// import firebase from 'firebase/app';
// import fb from '../../base';
// import 'firebase/firestore';
// import 'firebase/auth';
// import './index.css';

class Leaderboard extends Component {
    constructor(props) {
        super(props);
        this.email = props.email;
        this.state = {
            topUsers: []
        };
        this.setTopUsers = this.setTopUsers.bind(this);
    }

    // get the top users from the backend
    getTopUsers = () => {
        const url = "http://localhost:5001/muse-eec76/us-central1/app/compareUsers?"
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                email: email
            })
        };
        fetch(url, options)
            .then(response => {
                this.setTopUsers(response.data.topUsers);
                console.log(response.status);
            });
    }

    compareUsers = () => {
        const url = "http://localhost:5001/muse-eec76/us-central1/app/compareUsers?"
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                email: email
            })
        };
        fetch(url, options)
            .then(response => {
                console.log(response.status);
                this.getTopUsers();
            });
    }

    componentWillMount() {
        this.getTopUsers();
    }

    render() {
        return (
            <div className="Leaderboard">
                {topUsers.map(user => <ComparedUser user={user.email} />)}
            </div>
        );
    }
}

export default Contact;
