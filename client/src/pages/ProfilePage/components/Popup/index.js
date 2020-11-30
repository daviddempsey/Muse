import React, { Component } from "react";
import "./index.css";

export default class Popup extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <span className="close" onClick={this.handleClick}>
          &times;
        </span>
        <div className="content">
          <div className="row-1">
            <div className="col-2">
              <h1 className="title"> Edit Bio </h1>
              <div className="form"></div>
            </div>
          </div>
          <div className="row-2">
            <h1 className="title"> Manage Featured Playlists </h1>
            <div className="form"></div>
          </div>
          <div className="row-3">
            <h1 className="title"> Manage Socials </h1>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
