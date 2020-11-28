import React from 'react';
import './index.css';

import DefaultLayout from '../DefaultLayout';
import Home from './Home';
import About from './About';
import Contact from './Contact';

const LandingPage = () => {
  return (
<<<<<<< HEAD
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
=======
    <div className="LandingPage">
      <DefaultLayout>
        <Home />
        <About />
        <Contact />
      </DefaultLayout>
>>>>>>> origin/master
    </div>
  );
};

export default LandingPage;
