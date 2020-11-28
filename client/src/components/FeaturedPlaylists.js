import React, { useState } from 'react';
//import UserTopStats from '../services/userTopStats';

const FeaturedPlaylists = () => {
  const [playlists, setPlaylists] = useState([
    'joie de vivre',
    'je ne sais quoi',
    'je ne parle pas français'
  ]);

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div id='playlists'>
      <h2>Featured Playlists: {playlists}</h2>
    </div>
  );
};

export default FeaturedPlaylists;
