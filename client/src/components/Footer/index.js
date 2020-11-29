import React from "react";
import Logo from "../../assets/logo.svg";
import "./index.css";

const Footer = () => {
  const SPACE = "\u00a0";

  return (
    <div className="Footer">
      <ul className="footer">
        <li>
          <h3>© Bringing Listeners Together</h3>
        </li>
        <li className="empty" />
        <li>
          <h1>Muse{SPACE}</h1>
          <img src={Logo} alt="Muse" />
        </li>
      </ul>
    </div>
  );
};
export default Footer;
