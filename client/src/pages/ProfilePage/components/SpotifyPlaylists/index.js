import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base";
import "./index.css";
import "firebase/auth";
const auth = fb.auth();

const SpotifyPlaylists = () => {
  // use state to get the playlists
  const [playlists, setPlaylists] = useState("");

  // get the playlist
  const getPlaylists = async (email) => {
    setPlaylists(await UserService.getSpotifyPlaylists(email));
  };

  // lister function for playlists
  const PlaylistLister = ({ playlists }) =>
    Object.keys(playlists).map((item, i) => (
      <div className="container">
        <a
          href={
            "https://open.spotify.com/playlist/" + playlists[item].playlist_id
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <img alt="playlist" src={playlists[item].image} />
          <h3>{playlists[item].playlist_name}</h3>
        </a>
      </div>
    ));

  // check if component mounted
  React.useEffect(() => {
    // get the user's refresh token
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getPlaylists(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getPlaylists(user.email);
        }
      });
    }
  }, []);

  return (
    <div>
      <h2 className="title">Your Spotify Playlists</h2>
      <div className="playlistimgs">
        <PlaylistLister playlists={playlists} />
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
