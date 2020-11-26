import React from 'react';
import './index.css';

import LandingPageHeader from './LandingPageHeader';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Footer from '../../components/Footer';

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <LandingPageHeader/>
      <Home />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
