import React, { useState } from "react";
import "./index.css";
import HarmonizeIcon from "../assets/harmonize.svg";
import HarmonizeModal from "./HarmonizeModal";

const Harmonize = ({ userEmail, otherEmail }) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const showModal = () => setShowPopUp(true);

  return (
    <div>
      <div>
        <button
          className="harmonize"
          id="harmonize"
          onClick={showModal}
        >
          <img src={HarmonizeIcon} className="headphones" alt="headphones" />
          <h3>Harmonize</h3>
        </button>
      </div>
      {showPopUp && <HarmonizeModal setShow={setShowPopUp} email={userEmail} otherEmail={otherEmail}/>}
    </div>
  );
};

export default Harmonize;
