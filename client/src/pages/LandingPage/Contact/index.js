import React from "react";
import "./index.css";

import Graphic from "./graphic.svg";

const Contact = () => {
  return (
    <div className="Contact" id="contact">
      <div className="text">
        <h1>Contact Us</h1>
        <h2>muse@ucsd.edu</h2>
      </div>
      <div className="image">
        <img src={Graphic} alt="person walking and listening to music"></img>
      </div>
    </div>
  );
};
export default Contact;
