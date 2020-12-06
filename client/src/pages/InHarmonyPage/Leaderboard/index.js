import React, { useState } from 'react';
import UserService from '../../../services/user.service';
import fb from '../../../base';
import 'firebase/auth';
import './index.css';
import ComparedUser from './ComparedUser';
import HRBgGraphic from './Harmonize_Refresh_Background.svg';
import HRBttnGraphic from './Harmonize_Button.svg';
const auth = fb.auth();

/* class Leaderboard extends Component {

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
                <div className="harmonyHeader">
                    <h1>In Harmony</h1>
                    <h2>Click the note to make a new friend!</h2>
                    <div className="harmonyRefresh">
                        <img src={HRBgGraphic} alt="two people connecting through music"/>
                        <button className="rbutton"> 
                            <img src={HRBttnGraphic} alt="refresh compatibility list"/>
                        </button>
                    </div>
                </div>
                {topUsers.map(user => <ComparedUser user={user.email} />)}
                <div className="ComparedUsers">
                    <ComparedUser />
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
            {/*topUsers.map(user => <ComparedUser user={user.email} />)*/}
            <div className="ComparedUsers">
                <HarmonyLister harmonyList={inHarmonyList} />
            </div>
        </div>
    );
}

export default Leaderboard;
