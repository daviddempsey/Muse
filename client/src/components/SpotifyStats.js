import React from "react";
import "./index.css";
//import UserService from "../services/user.service";

// grabs the spotify stats for a user from firebase and returns it
const SpotifyStats = () => {
  // commmented out until we implement userservice
  /*let top_artists = UserService.getTopArtists();
    let top_genres = UserService.getTopGenres();
    let top_tracks = UserService.getTopTracks(); */
  // check if component mounted
  React.useEffect(() => {
    console.log("Hi");
  }, []);

  let top_artists = "1,000,000 artists listened to";
  let top_genres = "1,000,000 genres listened to";
  let top_tracks = "1,000,000 songs listened to";
  return (
    <div>
      <h1 className="title"> Spotify Stats </h1>
      <h1> {top_artists} </h1>
      <h1> {top_genres} </h1>
      <h1> {top_tracks} </h1>{" "}
    </div>
  );
};

export default SpotifyStats;
