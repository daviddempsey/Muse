import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

import Logo from '../../../assets/logo.svg';

const LandingPageHeader = () => {
  const SPACE = "\u00a0";

  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({behavior: 'smooth' });

  return <div className="LandingPageHeader">
    <h3>
      <ul className="scroll-menu">
          <li>
            <Link to="/"><img src={Logo} alt="Muse" /></Link>
            <h1>{SPACE}Muse</h1>
          </li>
          <li className="empty" />
          <li>
            <Link to="#home" onClick={scrollToId('home')} className="scroll-item">Home</Link>
          </li>
          <li>
            <Link to="#about" onClick={scrollToId('about')} className="scroll-item">About</Link>
          </li>
          <li>
            <Link to="#contact" on Click={scrollToId('contact')}className="scroll-item">Contact</Link>
          </li>
      </ul>
    </h3>
  </div>;
};
export default LandingPageHeader;
