import React, { Component } from "react";
import "./index.css";

export default class Popup extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <h1> Edit Bio </h1>
      </div>
    );
  }
}
