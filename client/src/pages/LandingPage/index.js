import React from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <DefaultLayout>
        <Home />
        <About />
        <Contact />
      </DefaultLayout>
    </div>
  );
};

export default LandingPage;
