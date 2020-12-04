import React, {useState} from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const PublicPlaylists = () => {
  // use state to get the playlists
  const [playlists, setPlaylists] = useState("");

  // get the playlist
  const getPlaylists = async(email) => {
    setPlaylists(await UserService.getSpotifyPlaylists(email));
  }

  // lister function for playlists
  const PlaylistLister = ({playlists}) => 
    Object.keys(playlists).map((item, i) => (
      <li key={i}>
        <a href={'https://open.spotify.com/playlist/' + playlists[item].playlist_id}>
          <span>{playlists[item].playlist_name}</span>
          <img alt='playlist' src={playlists[item].image} />
        </a>
      </li>
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
    console.log('Component is Mounted');
  }, []);

  return (
    <div id='playlists'>
      <h2>Your Public Playlists</h2>
      <br />
      <PlaylistLister playlists={playlists} />
    </div>
  );
};

export default PublicPlaylists;