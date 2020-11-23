import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './index.css';

const Header = () => {
  return <div className="Header">
    <h3>
      <ul className="navbar">
          <li>
            <Link to="/">
              <img src={Logo} alt="Muse" />
            </Link>
          </li>
          <li className="empty" />
          <li>
            <NavLink to="/profile" className="nav-item">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/friends" className="nav-item">Friends</NavLink>
          </li>
          <li>
            <NavLink to="/harmony" className="nav-item">In Harmony</NavLink>
          </li>
          <li>
            <NavLink to="/messages" className="nav-item">Messaging</NavLink>
          </li>
          <li>
            <NavLink to="/" className="nav-item">Logout</NavLink>
          </li>
      </ul>
    </h3>
  </div>;
};
export default Header;
