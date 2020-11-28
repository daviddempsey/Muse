import React, { useState } from 'react';
//import UserService from "../services/user.service";

// grabs the spotify stats for a user from firebase and returns it
const SpotifyStats = () => {
  // commmented out until we implement userservice
  /*let top_artists = UserService.getTopArtists();
    let top_genres = UserService.getTopGenres();
    let top_tracks = UserService.getTopTracks(); */
  const [topArtists, setTopArtist] = useState('Kanye West, Frank Ocean, EDEN');
  const [topTracks, setTopTracks] = useState('People in Paris, Novacane, Wake Up');
  const [topGenres, setTopGenres] = useState('R&B, Hip-Hop');

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div>
      <h1> {topArtists} </h1> <h1> {topTracks} </h1> <h1> {topGenres} </h1>{' '}
    </div>
  );
};

export default SpotifyStats;
