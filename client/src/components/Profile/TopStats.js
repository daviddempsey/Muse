import React, { useState } from 'react';
import UserService from '../../services/user.service';

const TopStats = () => {
  const [topArtists, setTopArtists] = useState('');
  const [topTracks, setTopTracks] = useState('');
  const [topGenres, setTopGenres] = useState('');

  const ArtistLister = ({ topArtists }) =>
    Object.keys(topArtists).map((item, i) => (
      <li key={i}>
        <a href={'https://open.spotify.com/artist/' + topArtists[item].track_id}>
          <span>{topArtists[item].track_name}</span>
        </a>
      </li>
    ));

  const TrackLister = ({ topTracks }) =>
    Object.keys(topTracks).map((item, i) => (
      <li key={i}>
        <a href={'https://open.spotify.com/track/' + topTracks[item].track_id}>
          <span>{topTracks[item].track_name}</span>
        </a>
      </li>
    ));

  const GenreLister = ({ topGenres }) =>
    Object.keys(topGenres).map((item, i) => (
      <li key={i}>
        <span>{topGenres[item].genre_name}</span>
      </li>
    ));

  const getTopArtists = async (email) => {
    setTopArtists(await UserService.getTopArtists(email));
  };

  const getTopTracks = async (email) => {
    setTopTracks(await UserService.getTopTracks(email));
  };

  const getTopGenres = async (email) => {
    setTopGenres(await UserService.getTopGenres(email));
  };

  // check if component mounted
  React.useEffect(() => {
    console.log('Hi');
    getTopArtists('davidgdempsey@gmail.com');
    getTopTracks('davidgdempsey@gmail.com');
    getTopGenres('davidgdempsey@gmail.com');
  }, [getTopArtists]);

  return (
    <div id='topstats'>
      <div id='topartists'>
        <h1>Top Artists</h1>
        <ArtistLister topArtists={topArtists} />
      </div>
      <div id='toptracks'>
        <h1>Top Tracks</h1>
        <TrackLister topTracks={topTracks} />
      </div>
      <div id='topgenres'>
        <h1>Top Genres</h1>
        <GenreLister topGenres={topGenres} />
      </div>
    </div>
  );
};

export default TopStats;
