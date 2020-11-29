import React, { Component } from "react";
import "./index.css";
import Popup from "./Popup";
import EditButton from "./EditProfile.png";

export default class EditProfilePage extends Component {
  state = {
    seen: false,
  };

  togglePop = () => {
    this.setState({
      seen: !this.state.seen,
    });
  };

  render() {
    return (
      <div>
        <button className="btn" onClick={this.togglePop}>
          <h3>Edit Profile</h3>
        </button>
        {this.state.seen ? (
          <Popup className="popup" toggle={this.togglePop} />
        ) : null}
      </div>
    );
  }
}
