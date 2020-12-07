import React, { Component } from "react";
import fb from "../../../base";
import "firebase/auth";
import "./index.css";
import HarmonyLister from "./HarmonyLister";
import HRBgGraphic from "./Harmonize_Refresh_Background.svg";
import HRBttnGraphic from "./Harmonize_Button.svg";
import ScaleLoader from "react-spinners/ScaleLoader";
const auth = fb.auth();

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEmpty: true,
      userEmail: "",
      topUsers: [],
      loading: true,
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
    // get user session
    this.authUser().then((user) => {
      this.setState({
        userEmail: user.email,
      });

      // get the top users
      this.getTopUsers().then((userList) => {
        // if the user list's length is 0, then empty list is true
        if (userList.length === 0) {
          this.setState({
            topUsers: userList,
            loading: false,
            listEmpty: true,
          });
          // else the user list is not empty and listEmpty is now false
        } else {
          this.setState({
            topUsers: userList,
            loading: false,
            listEmpty: false,
          });
        }
      });
    });
  }

  // get the top users from the backend
  getTopUsers = async () => {
    const url =
      "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/" +
      this.state.userEmail;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    return await fetch(url, options).then((response) => {
      return response.json().then((data) => {
        return data.similar_users;
      });
    });
  };

  // compare users in the backend
  compareUsers = async () => {
    // start loading
    this.setState({ loading: true });

    // then fetch the new users
    const url =
      "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/" +
      this.state.userEmail +
      "/100";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await fetch(url, options).then((response) => {
      console.log(response.status);
    });

    // reload the list
    this.componentDidMount();
  };

  render() {
    return (
      <div className="Leaderboard">
        <div className="harmonyHeader">
          <h1>In Harmony</h1>
          <h2>Click the note to make a new friend!</h2>
          <div className="harmonyRefresh">
            <img src={HRBgGraphic} alt="two people connecting through music" />
            {this.state.loading ? (
              <ScaleLoader
                className="harmonyLoader"
                size={250}
                color={"#ff6666"}
                loading={this.state.loading}
              />
            ) : (
              <button className="rbutton" onClick={this.compareUsers}>
                <img src={HRBttnGraphic} alt="refresh compatibility list" />
              </button>
            )}
          </div>
        </div>
        <div className="ComparedUsers">
          {this.state.listEmpty && (
            <h2>Please press the Music Note to find compatible people!</h2>
          )}
          {!this.state.listEmpty && (
            <HarmonyLister harmonyList={this.state.topUsers} />
          )}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
