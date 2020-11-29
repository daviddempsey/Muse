import React from "react";
import "../index.css";
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
  let top_genres_num = "1,000,000";
  let top_tracks_num = "1,000,000";
  let minutes_num = "1,000,000";

  return (
    <div>
      <h2 className="title"> Spotify Stats </h2>
      <div className="element">
        <h1> {top_artists_num} </h1>
        <h3>artists listened to</h3>
      </div>
      <div className="altelement">
        <h1> {top_genres_num} </h1>
        <h3>genres listened to</h3>
      </div>
      <div className="element">
        <h1> {top_tracks_num} </h1>
        <h3> songs listened to</h3>{" "}
      </div>
      <div className="altelement">
        <h1> {minutes_num} </h1>
        <h3>minutes listened to</h3>
      </div>
    </div>
  );
};

export default SpotifyStats;
