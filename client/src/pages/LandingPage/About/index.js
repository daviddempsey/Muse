import React from 'react';
import './index.css';

import Graphic from './graphic.svg';
import MusicNote from './music-note.svg';

const About = () => {
  return (
    <div className='About' id='about'>
      <div className='image'>
        <img src={Graphic} alt='person walking and listening to music'></img>
      </div>
      <div className='text'>
        <h1>About Muse</h1>
        <p>
          Muse is a social media app that revolves around
          <br />
          music. Share your favorite songs, artists, and playlists
          <br />
          seamlessly on your profile. With Muse you can
          <br />
          connect with friends and new people with ease!
        </p>
        <div className='row'>
          <img src={MusicNote} alt='music note'></img>
          <p>
            Easy profile setup, Muse integrates seamlessly with Spotify so that
            you
            <br />
            can showcase all your favorite music with no hassle.
          </p>
        </div>
        <div className='row'>
          <img src={MusicNote} alt='music note'></img>
          <p>
            Muse uses a unique algorithm that uses your listening habits, top
            <br />
            songs, albums, artists, and genres to connect you with new friends.
          </p>
        </div>
        <div className='row'>
          <img src={MusicNote} alt='music note'></img>
          <p>
            Message, curate playlists, and compute musical compatibility with
            your
            <br />
            friends directly through Muse.
          </p>
        </div>
      </div>
    </div>
  );
};
export default About;
