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

  const myProfile = async () => {
    if (auth.currentUser) {
      if (link === auth.currentUser.email) {
        window.location.href = "/profile/" + btoa(link);
      }
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          if (link === user.email) {
            window.location.href = "/profile/" + btoa(link);
          }
        }
      });
    }
  };

  const getLink = async () => {
    setLink(await getUser());
  };

  const getUser = async () => {
    if (auth.currentUser) {
      return auth.currentUser.email;
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          if (user.email === this.state.userEmail) {
            return user.email;
          }
        }
      });
    }
  };

  React.useEffect(() => {
    getLink();
  });

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
              to={"/profile/" + btoa(link)}
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
            <NavLink to="/" className="nav-item">
              Logout
            </NavLink>
          </li>
        </ul>
      </h3>
    </div>
  );
};
export default Header;
