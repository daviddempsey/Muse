import React, {useState} from 'react';
import UserService from '../../services/user.service';

const PublicPlaylists = () => {
  // use state to get the playlists
  const [playlists, setPlaylists] = useState("");

  // get the playlist
  const getPlaylists = async(refresh_token) => {
    setPlaylists(await UserService.getSpotifyPlaylists(refresh_token));
  }

  // lister function for playlists
  const PlaylistLister = ({playlists}) => 
    Object.keys(playlists).map((item, i) => (
      <li key={i}>
        <a href={'https://open.spotify.com/playlist/' + playlists[item].id}>
          <span>{playlists[item].name}</span>
          <img alt='playlist' src={playlists[item]['images'][0]['url']} />
        </a>
      </li>
  ));

  // check if component mounted
  React.useEffect(() => {
    console.log('Component is Mounted');
    getPlaylists( 
      'AQDW-0tRGxPcfQ6hIutmpLuCWFqbfPy9ABL6eDlWI_NCryjA1KSxdT0GQplL91dIrJ__tAjJ-FggY_V1IOUsQk5nc8mr2qYEyeWh8QLwNtvjpG-QLJinXZBeqCQun95hHzg')
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