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
        <img
          src={EditButton}
          className="btn"
          alt="edit"
          onClick={this.togglePop}
        />
        {this.state.seen ? <Popup toggle={this.togglePop} /> : null}
      </div>
    );
  }
}
