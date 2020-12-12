import React, { useState } from "react";
import UserService from "../../../services/user.service";
import fb from "../../../base";
import "./index.css";
import "firebase/auth";
const auth = fb.auth();

const SpotifyPlaylists = ({ userEmail }) => {
  // use state to get the playlists
  const [playlists, setPlaylists] = useState("");

  // get the playlist
  const getPlaylists = async (email) => {
    setPlaylists(await UserService.getSpotifyPlaylists(email));
  };

  // lister function for playlists
  const PlaylistLister = ({ playlists }) => (
    <div className="rows">
      {Object.keys(playlists).map(
        (item, i) =>
          i % 3 === 0 &&
          playlists[i] && (
            <div className="row-1" key={i}>
              <div className="album">
                <a
                  href={
                    "https://open.spotify.com/playlist/" +
                    playlists[i].playlist_id
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="playlist" src={playlists[i].image} />
                  <h3>{playlists[i].playlist_name}</h3>
                </a>
              </div>
              {playlists[i + 1] && (
                <div className="album" key={i+1}>
                  <a
                    href={
                      "https://open.spotify.com/playlist/" +
                      playlists[i + 1].playlist_id
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img alt="playlist" src={playlists[i + 1].image} />
                    <h3>{playlists[i + 1].playlist_name}</h3>
                  </a>
                </div>
              )}
              {playlists[i + 2] && (
                <div className="album" key={i+2}>
                  <a
                    href={
                      "https://open.spotify.com/playlist/" +
                      playlists[i + 2].playlist_id
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img alt="playlist" src={playlists[i + 2].image} />
                    <h3>{playlists[i + 2].playlist_name}</h3>
                  </a>
                </div>
              )}
            </div>
          )
      )}
    </div>
  );

  // check if component mounted
  React.useEffect(() => {
    // get the user's refresh token
    if (auth.currentUser) {
      getPlaylists(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getPlaylists(user.email);
        }
      });
    }
  }, [userEmail]);

  return (
    <div>
      <h2 className="title">Spotify Playlists</h2>
      <div className="playlistimgs">
        <PlaylistLister playlists={playlists} />
      </div>
    </div>
  );
};

export default SpotifyPlaylists;
