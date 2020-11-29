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
          &times;{" "}
        </span>
        <p>I'm A Pop Up!</p>
      </div>
    );
  }
}
