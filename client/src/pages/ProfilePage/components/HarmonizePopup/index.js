import React, { Component } from "react";
import UserService from "../../../../services/user.service";
import "./index.css";

const HarmonizePopup = () => {
  const togglePop = () => {
    document.getElementById("popup").style.display = "none";
    document.getElementById("page").style.filter = "brightness(1)";
    document.getElementById("page").style.pointerEvents = "auto";
    document.getElementById("page").style.userSelect = "auto";
  };

  return <div className="modal"></div>;
};

export default HarmonizePopup;
