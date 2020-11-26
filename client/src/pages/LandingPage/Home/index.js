import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

import Logo from '../../../assets/logo.svg';
import Graphic from './graphic.svg';

const Home = () => {
  const SPACE = "\u00a0";

  const scrollToHome = () => document.getElementById('home')?.scrollIntoView({behavior: 'smooth' });

  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({behavior: 'smooth' });

  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth' });

  const loginToSpotify = () => {
    fetch('http://localhost:8888/')
    .then(res => res.json())
    .then((data) => {
      this.setState({contacts: data})
    })
    .catch(console.log)
  };

  return <div className="Home" id="home">
    <header>
      <h3>
        <ul className="scroll-menu">
            <li>
              <Link to="/"><img src={Logo} alt="Muse" /></Link>
              <h1>{SPACE}Muse</h1>
            </li>
            <li className="empty" />
            <li>
              <Link to="#home" onClick={scrollToHome} className="scroll-item">Home</Link>
            </li>
            <li>
              <Link to="#about" onClick={scrollToAbout} className="scroll-item">About</Link>
            </li>
            <li>
              <Link to="#contact" onClick={scrollToContact}className="scroll-item">Contact</Link>
            </li>
        </ul>
      </h3>
    </header>
    <div className="desc">
      <div className="text-col">
        <h1>Harmonize<br/>with Others</h1>
        <p>Let's answer the question "What kind of music do you<br/>listen to?" together! Join a community where you can<br/>compare and connect through music.</p>
        <button className="login-btn" onClick={loginToSpotify}><h3>Register / Login</h3></button>
      </div>
      <div className="image-col">
        <img src={Graphic} alt="people dancing"></img>
      </div>
    </div>
  </div>;
};
export default Home;
