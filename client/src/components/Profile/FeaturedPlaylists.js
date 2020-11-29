import React from 'react';
import UserService from "../../services/user.service";

const FeaturedPlaylists = () => {
  // check if component mounted
  React.useEffect(() => {
    console.log('Component is Mounted');
  }, []);

  return (
    <div id='playlists'>
      <h2> Featured Playlists: {UserService.getPlaylists()} </h2>{' '}
    </div>
  );
};

export default FeaturedPlaylists;
