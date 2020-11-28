import React, { useState } from 'react';
import UserTopStats from '../services/userTopStats';

const TopStats = () => {
  const [topArtist, setTopArtist] = useState('');

  const [topTrack, setTopTrack] = useState('');

  setTopArtist(UserTopStats.getTopArtist());
  setTopTrack(UserTopStats.getTopTrack());

  return (
    // idk what to return
    <div>
      <h2>Top Artist: {topArtist}</h2>
      <h2>Top Track : {topTrack}</h2>
    </div>
  );
};

export default TopStats;