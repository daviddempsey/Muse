import React from 'react';
import './index.css';

import Graphic from './graphic.svg';

const Home = () => {
  return <div className="Home">
    <div className="text-col">
      <h1>Harmonize<br/>with Others</h1>
      <p>Let's answer the question "What kind of music do you<br/>listen to?" together! Join a community where you can<br/>compare and connect through music.</p>
      <button className="login-btn"><h3>Register / Login</h3></button>
    </div>
    <div className="image-col">
      <img src={Graphic} alt="people dancing"></img>
    </div>
  </div>;
};
export default Home;
