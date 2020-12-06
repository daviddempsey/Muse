import React, { useState } from 'react';
import UserService from '../../services/user.service';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const TopStats = () => {
  const [topArtists, setTopArtists] = useState('');
  const [topTracks, setTopTracks] = useState('');
  const [topGenres, setTopGenres] = useState('');

  const ArtistLister = ({ topArtists }) =>
    Object.keys(topArtists).map((item, i) => (
      <li key={i}>
        <a href={'https://open.spotify.com/artist/' + topArtists[item].track_id}>
          <span>{topArtists[item].artist_name}</span>
          <img alt='pfp' src={topArtists[item]['images'][0]} />
        </a>
      </li>
    ));

  const TrackLister = ({ topTracks }) =>
    Object.keys(topTracks).map((item, i) => (
      <li key={i}>
        <a href={'https://open.spotify.com/track/' + topTracks[item].track_id}>
          <span>{topTracks[item].track_name}</span>
          <img alt='pfp' src={topTracks[item]['images'][0]} />

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
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getTopArtists(userEmail);
      getTopTracks(userEmail);
      getTopGenres(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getTopArtists(user.email);
          getTopTracks(user.email);
          getTopGenres(user.email);
        }
      });
    }
  }, []);

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
