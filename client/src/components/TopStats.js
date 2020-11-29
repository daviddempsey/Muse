import React, { useState } from 'react';
//import UserTopStats from '../services/userTopStats';

const TopStats = () => {
  const [topArtist, setTopArtist] = useState('Kanye West');
  const [topTrack, setTopTrack] = useState('People in Paris');
  const [topGenres, setTopGenres] = useState('R&B, Hip-Hop');

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div id='topstats'>
      <h2>Top Artist: {topArtist}</h2>
      <h2>Top Track : {topTrack}</h2>
      <h3>Top Genre: {topGenres}</h3>
    </div>
  );
};

export default TopStats;
