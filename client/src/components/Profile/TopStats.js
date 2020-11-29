import React from 'react';
import UserService from "../../services/user.service";

const TopStats = () => {
  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
  }, []);

  return (
    <div id='topstats'>
      <h2>Top Artist: {UserService.getTopArtists()}</h2>
      <h2>Top Track : {UserService.getTopTracks()}</h2>
      <h3>Top Genre: {UserService.getTopGenres()}</h3>
    </div>
  );
};

export default TopStats;
