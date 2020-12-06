import React, { Component, useState } from 'react';
import UserService from '../../../services/user.service';
import fb from '../../../base';
import 'firebase/auth';
import './index.css';
import ComparedUser from './ComparedUser';
import HarmonyLister from './HarmonyLister';
import HRBgGraphic from './Harmonize_Refresh_Background.svg';
import HRBttnGraphic from './Harmonize_Button.svg';
const auth = fb.auth();

/*class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listEmpty: false,
            userEmail: '',
            topUsers: []
        };
        this.getTopUsers = this.getTopUsers.bind(this);
        this.compareUsers = this.compareUsers.bind(this);
        this.authUser = this.authUser.bind(this);
    }

    authUser() {
        return new Promise(function (resolve, reject) {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {
                    reject("User not logged in");
                }
            });
        });
    }
    
    componentDidMount() {
        this.authUser().then((user) => {
            this.getTopUsers().then((userList) => {
                console.log(userList);
                this.setState({
                    topUsers: userList
                });
            });
        })
    }

    // get the top users from the backend
    getTopUsers = () => {
        const url = "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/kennyyu168@yahoo.com";
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        return fetch(url, options)
            .then((response) => {
                return response.json().then((data) => {
                    return data.similar_users;
                });
            });
    }

    // compare users in the backend
    compareUsers = () => {
        const url = "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/kennyyu168@yahoo.com/100";
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        fetch(url, options)
            .then(response => {
                this.getTopUsers();
                console.log(response.status);
            });
    }

    render() {
        return (
            <div className="Leaderboard">
                <div className="harmonyHeader">
                    <h1>In Harmony</h1>
                    <h2>Click the note to make a new friend!</h2>
                    <div className="harmonyRefresh">
                        <img src={HRBgGraphic} alt="two people connecting through music"/>
                        <button className="rbutton" onClick={this.compareUsers}> 
                            <img src={HRBttnGraphic} alt="refresh compatibility list"/>
                        </button>
                    </div>
                </div>
                <div className="ComparedUsers">
                    {this.state.listEmpty && <h2>Please press the Music Note to find compatible people!</h2>}
                    {!this.state.listEmpty && <HarmonyLister harmonyList={this.state.topUsers} />}
                </div>
            </div>
        );
    }
} */

const Leaderboard = () => {
    // calls a child Compared user for each matched user
    const [inHarmonyList, setInHarmonyList] = useState([]);

    // calls on a Friend component for each friend in the user's friendsList
    const HarmonyLister = ({harmonyList}) => 
        Object.keys(harmonyList).map((item, i) => (
            <ul key={i}>
                <ComparedUser compEmail={harmonyList[item].email} compOverall={harmonyList[item].compatibility_score} />
            </ul>
        ));

    // get the in harmony list from the database
    const getInHarmonyList = async (email) => {
        setInHarmonyList(await UserService.getInHarmony(email));
    }

    // get create the in harmony list from the database
    const refreshInHarmony = async (email) => {
        // do a post call to do all the stuff
        const options = {
            method:'POST',
            headers: { 'Content-Type': 'application/json'}
        }
        return fetch('https://localhost:5001/muse-eec76/us-central1/app/api/in_harmony' + email, options)
        .then(response => response.json());
    }

    React.useEffect(() => {
        if (auth.currentUser) {
            let userEmail = fb.auth().currentUser.email;
            getInHarmonyList(userEmail);
        } else {
            auth.onAuthStateChanged(function (user) {
                if (user) {
                    getInHarmonyList(user.email);
                }
            });
        }
    }, []);

    return (
        <div className="Leaderboard">
            <div className="harmonyHeader">
                <h1>In Harmony</h1>
                <h2>Click the note to make a new friend!</h2>
                <div className="harmonyRefresh">
                    <img src={HRBgGraphic} alt="two people connecting through music"/>
                    <button className="rbutton" onClick={refreshInHarmony}> 
                        <img src={HRBttnGraphic} alt="refresh compatibility list"/>
                    </button>
                </div>
            </div>
            <div className="ComparedUsers">
                <HarmonyLister harmonyList={inHarmonyList} />
            </div>
        </div>
    );
}

export default Leaderboard;
