import React, { useState } from 'react';
import userService from '../../services/user.service';
//import UserService from "../services/user.service";

// grabs the spotify stats for a user from firebase and returns it
const SpotifyStats = () => {
  // my assumption is that the database stores numerical value of how many minutes, numberof songs, etc.
  let songStats = UserService.getSongStats();
  let albumStats = UserService.getAlbumStats();
  let artistStats = UserService.getArtistStats();
  let minuteStats = UserService.getMinuteStats();

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div>
      <h1> {songStats} </h1> <h1> {albumStats} </h1> <h1> {artistStats} </h1>
      <h1>{minuteStats}</h1>{' '}
    </div>
  );
};

export default SpotifyStats;
