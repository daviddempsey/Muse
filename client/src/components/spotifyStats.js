import React from 'react';
//import UserService from "../services/user.service";


// grabs the spotify stats for a user from firebase and returns it
const SpotifyStats = () => {
  // commmented out until we implement userservice
  /*let top_artists = UserService.getTopArtists();
    let top_genres = UserService.getTopGenres();
    let top_tracks = UserService.getTopTracks(); */
  // check if component mounted
  React.useEffect(()=> {
    console.log("Hi");
  }, []);

  let top_artists = 'test top artist text';
  let top_genres = 'test top artist text';
  let top_tracks = 'test top artist text';
  return (
    <div>
      <h1> {top_artists} </h1> <h1> {top_genres} </h1> <h1> {top_tracks} </h1>{' '}
    </div>
  );
};

export default SpotifyStats;
