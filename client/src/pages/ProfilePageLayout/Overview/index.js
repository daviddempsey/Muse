import React from 'react';
import './index.css';

import Background from './background.svg';

const Overview = () => {
  const backgroundStyles = {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: '100%',
  };

  return <div className="Overview">
    <div className="box" style={backgroundStyles}>
      <div className="profile-contents">
        <div className="pfp">
          <div className="placeholder" />
        </div>
        <div className="name-line">
          <h1 className="profile-name">Frank_Ocean_22</h1>
        </div>
        <div className="socials">
          <div className="placeholder"><div className="placeholder-btn" /></div>
          <div className="placeholder"><div className="placeholder-btn" /></div>
          <div className="placeholder"><div className="placeholder-btn" /></div>
          <div className="placeholder"><div className="placeholder-btn" /></div>
          <div className="placeholder"><div className="placeholder-btn" /></div>
        </div>
        <div className="bio">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      
    </div>
  </div>;
};
export default Overview;
