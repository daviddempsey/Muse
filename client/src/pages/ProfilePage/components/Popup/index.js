import React from "react";
import PFP from "../../assets/PFP.png";
import "./index.css";

const Popup = () => {
  const togglePop = () => {
    document.getElementById("popup").style.display = "none";
    document.getElementById("page").style.filter = "brightness(1)";
  };

  return (
    <div className="modal">
      <span className="close" onClick={togglePop}>
        &times;
      </span>
      <div className="content">
        <div className="row-1">
          <div className="col-1">
            <img src={PFP} className="pfp" alt="pfp" />
          </div>
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
        <div className="row-4">
          <button className="btn">
            <h3>Save</h3>
          </button>
          <button className="btn">
            <h3>Cancel</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
