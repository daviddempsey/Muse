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

  let top_artists_num = "1,000,000";
  let top_artists = "artists listened to";
  let top_genres_num = "1,000,000";
  let top_genres = "genres listened to";
  let top_tracks_num = "1,000,000";
  let top_tracks = "songs listened to";

  return (
    <div>
      <h2 className="title"> Spotify Stats </h2>
      <div className="element">
        <h2> {top_artists_num} </h2>
        <h3> {top_artists} </h3>
      </div>
      <div className="altelement">
        <h2> {top_genres_num} </h2>
        <h3> {top_genres} </h3>
      </div>
      <div className="element">
        <h2> {top_tracks_num} </h2>
        <h3> {top_tracks} </h3>{" "}
      </div>
    </div>
  );
};

export default SpotifyStats;
