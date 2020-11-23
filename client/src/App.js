import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import socialMedia from './components/SocialMedia';
import Biography from './components/Biography';
import FeaturedArtist from './components/FeaturedArtist';
import FeaturedTrack from './components/FeaturedTrack';
import ProfileLink from './components/ProfileLink';
import SpotifyStats from './components/SpotifyStats';
import CurrentTrack from './components/CurrentTrack';

function App() {
  Axios({
    method: 'GET',
    url: 'http://localhost:5000/',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    console.log(res.data.message);
  });

  return (
    <Router>
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
        <Switch>
          <Route path='/socialmedia' component={socialMedia}></Route>
          <Route path='/biography' component={Biography}></Route>
          <Route path='/featuredartist' component={FeaturedArtist}></Route>
          <Route path='/featuredtrack' component={FeaturedTrack}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
