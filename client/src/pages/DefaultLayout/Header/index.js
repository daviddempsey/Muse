import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import "./index.css";
import fb from "../../../base";
import "firebase/auth";
const auth = fb.auth();

const Header = () => {
  const SPACE = "\u00a0";
  const [link, setLink] = useState("");
  const [user, setUser] = useState(null);

  const authUser = () => {
    return new Promise(function (resolve, reject) {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject("User not logged in");
        }
      });
    });
  };

  const myProfile = () => {
    if (user) {
      if (link === btoa(user.email)) {
        window.location.href = "/profile/" + btoa(user.email);
      }
    }
  };

  // const getLink = (user) => {
  //   setLink(getUser(user));
  // };

  // const getUser = (user) => {
  //   return user.email;
  // };

  React.useEffect(() => {
    authUser().then((user) => {
      setUser(user);
      setLink(btoa(user.email));
    });
  });

  if (!user) return null;
  return (
    <div className="Header">
      <h3>
        <ul className="navbar">
          <li>
            <Link to="/">
              <img src={Logo} className="logo" alt="Muse" />
            </Link>
            <h1>{SPACE}Muse</h1>
          </li>
          <li className="empty" />
          <li>
            <NavLink
              to={"/profile/" + link}
              onClick={() => myProfile()}
              className="nav-item"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/friends" className="nav-item">
              Friends
            </NavLink>
          </li>
          <li>
            <NavLink to="/harmony" className="nav-item">
              In Harmony
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" className="nav-item">
              Messaging
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" className="nav-item">
              Logout
            </NavLink>
          </li>
        </ul>
      </h3>
    </div>
  );
};
export default Header;
