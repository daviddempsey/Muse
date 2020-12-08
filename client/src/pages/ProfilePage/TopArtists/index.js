import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import "./index.css";

const TopArtists = ({ userEmail }) => {
  const [topArtists, setTopArtists] = useState("");

  const ArtistLister = ({ topArtists }) => (
    <div className="rows">
      <div className="row-1">
        {topArtists[0] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[0].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[0]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
        {topArtists[1] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[1].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[1]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
        {topArtists[2] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[2].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[2]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
      </div>
      <div className="row-1">
        {topArtists[3] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[3].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[3]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
        {topArtists[4] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[4].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[4]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
        {topArtists[5] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[5].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[5]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
      </div>
      <div className="row-1">
        {topArtists[6] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[6].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[6]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
        {topArtists[7] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[7].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[7]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
        {topArtists[8] && (
          <div className="image">
            <a
              href={
                "https://open.spotify.com/artist/" + topArtists[8].artist_id
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={topArtists[8]["images"][0]} alt="artist" />
            </a>
          </div>
        )}
      </div>
    </div>
  );

  const getTopArtists = async (email) => {
    setTopArtists(await UserService.getTopArtists(email));
  };

  // check if component mounted
  React.useEffect(() => {
    getTopArtists(userEmail);
  }, [userEmail]);

  return (
    <div>
      <h2 className="title"> Top Artists </h2>
      <div className="artistimgs">
        <ArtistLister topArtists={topArtists} />
      </div>
    </div>
  );
};

export default TopArtists;
