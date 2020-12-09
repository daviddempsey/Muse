import React, { useState } from "react";
import "./index.css";
import HarmonizeIcon from "../assets/harmonize.svg";

const Harmonize = ({ userEmail, otherEmail }) => {
  const [compareData, setCompareData] = useState(0);
  const [artistData, setArtistData] = useState(0);
  const [genreData, setGenreData] = useState(0);
  const [showPopUp, setShowPopUp] = useState(false);

  const ArtistLister = ({ SimilarArtists }) =>
    Object.keys(SimilarArtists).map((item, i) => (
      <div id="Similar Artist">
        <li key={i}>
          <p>
            <a
              href={
                "https://open.spotify.com/artist/" + SimilarArtists[item].id
              }
            >
              {SimilarArtists[item].name}
            </a>
          </p>
          {/* <h5>Difference: {SimilarArtists[item].difference}</h5> */}
        </li>
      </div>
    ));

  const GenreLister = ({ SimilarGenres }) =>
    Object.keys(SimilarGenres).map((item, i) => (
      <div id="Similar Artist">
        <li key={i}>
          <p style={{ display: "inline" }}>{SimilarGenres[item].name} </p>
          <p style={{ display: "inline" }}>
            (Score: {(SimilarGenres[item].score * 100).toFixed(2)}%,{" "}
          </p>
          <p style={{ display: "inline" }}>
            Tracks: {SimilarGenres[item].frequency_sum})
          </p>
        </li>
      </div>
    ));

  /* HARMONIZE FETCH CALLS */
  const compareTwoUsers = async (myEmail, otherUserEmail) => {
    const url =
      "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/compareFriends/" +
      myEmail +
      "/" +
      otherUserEmail;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
      "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/compare/similar/artists/" +
      myEmail +
      "/" +
      otherUserEmail;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("artist: " + data);
    return data;
  };

  // Perform comparison between two users
  const genreBreakdown = async (myEmail, otherUserEmail) => {
    const url =
      "http://localhost:5001/muse-eec76/us-central1/app/api/in_harmony/compare/similar/genres/" +
      myEmail +
      "/" +
      otherUserEmail;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("genre: " + data);
    return data;
  };

  // to call multiple events
  const onClick = async (myEmail, otherUserEmail) => {
    if (!showPopUp) {
      setCompareData(await compareTwoUsers(myEmail, otherUserEmail));
      setArtistData(await artistBreakdown(myEmail, otherUserEmail));
      setGenreData(await genreBreakdown(myEmail, otherUserEmail));
    }
    setShowPopUp(!showPopUp);

    var specifiedElement = document.getElementById("compareTwoUsers");
    document.addEventListener("click", function (event) {
      var isClickInside = specifiedElement.contains(event.target);
      if (!isClickInside) {
        setShowPopUp(false);
      }
    });
  };

  return (
    <div>
      <div>
        <button
          className="harmonize"
          id="harmonize"
          onClick={() => onClick(userEmail, otherEmail)}
        >
          <img src={HarmonizeIcon} className="headphones" alt="headphones" />
          <h3>Harmonize</h3>
        </button>
      </div>
      {showPopUp && (
        <div className="modal2" id="compareTwoUsers">
          <p>
            In Harmony Compatibility Score:{" "}
            {(compareData["score"] * 100).toFixed(2)}%
          </p>
          <p>
            Similar Artist Score: {(compareData["artist"] * 100).toFixed(2)}%
          </p>
          <p>
            Similar Genre Score: {(compareData["genres"] * 100).toFixed(2)}%
          </p>
          <p>
            Similar Audio Features Score:{" "}
            {(compareData["audio_features"] * 100).toFixed(2)}%
          </p>
          <p style={{ display: "inline" }}>Shared Top Artists: </p>
          {artistData[0] ? (
            <ArtistLister SimilarArtists={artistData} />
          ) : (
            <p style={{ display: "inline" }}>
              None
              <br />
            </p>
          )}
          <p style={{ display: "inline" }}>Shared Top Genres: </p>
          {genreData[0] ? (
            <GenreLister SimilarGenres={genreData} />
          ) : (
            <p style={{ display: "inline" }}>
              None
              <br />
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Harmonize;
