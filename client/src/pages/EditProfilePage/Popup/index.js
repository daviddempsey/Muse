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
        <h1 className="title"> Edit Bio </h1>
      </div>
    );
  }
}
