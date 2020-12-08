import React, { useState } from 'react';
import './index.css';
import Harmonize from '../../assets/harmonize.svg';

const InHarmony = ({ userEmail, otherEmail }) => {
  const [compareData, setCompareData] = useState(0);
  const [artistData, setArtistData] = useState(0);
  const [genreData, setGenreData] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);

  const ArtistLister = ({ SimilarArtists }) =>
    Object.keys(SimilarArtists).map((item, i) => (
        <div id="Similar Artist">
            <li key={i}>
                <h3><a href={"https://open.spotify.com/artist/" + SimilarArtists[item].id}>{SimilarArtists[item].name}</a></h3>
                {/* <h5>Difference: {SimilarArtists[item].difference}</h5> */}
            </li>
        </div>
    ));

    const GenreLister = ({ SimilarGenres }) =>
    Object.keys(SimilarGenres).map((item, i) => (
        <div id="Similar Artist">
            <li key={i}>
                <h3>{SimilarGenres[item].name}</h3>
                <h5>Score: {SimilarGenres[item].score * 100}</h5>
            </li>
        </div>
    ));

  /* HARMONIZE FETCH CALLS */
  const compareTwoUsers = async (myEmail, otherUserEmail) => {
    const url =
      'http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/compareFriends/' +
      myEmail +
      '/' +
      otherUserEmail;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  };

  // Perform comparison between two users
  const artistBreakdown = async (myEmail, otherUserEmail) => {
    const url =
      'http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/compare/similar/artists/' +
      myEmail +
      '/' +
      otherUserEmail;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('artist: ' + data);
    return data;
  };

  // Perform comparison between two users
  const genreBreakdown = async (myEmail, otherUserEmail) => {
    const url =
      'http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/compare/similar/genres/' +
      myEmail +
      '/' +
      otherUserEmail;
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('genre: ' + data);
    return data;
  };

  // to call multiple events
  const onClick = async (myEmail, otherUserEmail) => {
    setCompareData(await compareTwoUsers(myEmail, otherUserEmail));
    setArtistData(await artistBreakdown(myEmail, otherUserEmail));
    setGenreData(await genreBreakdown(myEmail, otherUserEmail));
    setShowPopUp(true);
  };

  React.useEffect(() => {
    console.log('mounted');
  }, []);

  return (
    <div>
      <button
        className='harmonize'
        id='harmonize'
        onClick={() => onClick(userEmail, otherEmail)}
      >
        <img src={Harmonize} className='headphones' alt='headphones' />
        <h3>In Harmony</h3>
      </button>
      {showPopUp ? (
        <div id='popup'>
          <div id='compareTwoUsers'>
            <h2> In Harmony </h2>
            <h5>
              In Harmony Compatibility Score: {compareData['score'] * 100}
            </h5>
            <h5>Similar Artist Score: {compareData['artist'] * 100}</h5>
            <h5>Similar Genre Score: {compareData['genres'] * 100}</h5>
            <h5>
              Similar Audio Features Score:{' '}
              {compareData['audio_features'] * 100}
            </h5>
          </div>
          <h2> Similar Artists </h2>
          <ArtistLister SimilarArtists={artistData} />
          <h2> Similar Genres </h2>
          <GenreLister SimilarGenres={genreData} />
        </div>
      ) : null}
    </div>
  );
};

export default InHarmony;
