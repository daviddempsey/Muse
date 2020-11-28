import React, { useState } from 'react';
//import UserService from "../services/user.service";

// grabs the spotify stats for a user from firebase and returns it
const SpotifyStats = () => {
  // commmented out until we implement userservice
  /*let top_artists = UserService.getTopArtists();
    let top_genres = UserService.getTopGenres();
    let top_tracks = UserService.getTopTracks(); */
  // my assumption is that the database stores numerical value of how many minutes, numberof songs, etc.
  const [songStats, setSongStats] = useState(100000);
  const [albumStats, setAlbumStats] = useState(100000);
  const [artistStats, setAristStats] = useState(1000000);
  const [minuteStats, setMinuteStats] = useState(10000000000);

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div>
      <h1> {songStats} </h1> <h1> {albumStats} </h1> <h1> {artistStats} </h1><h1>{minuteStats}</h1>{' '}
    </div>
  );
};

export default SpotifyStats;
