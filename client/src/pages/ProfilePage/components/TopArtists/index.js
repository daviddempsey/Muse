import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import "./index.css";

const TopArtists = ({ userEmail }) => {
  const [topArtists, setTopArtists] = useState("");

  const ArtistLister = ({ topArtists }) =>
    Object.keys(topArtists).map((item, i) => (
      <a
        href={"https://open.spotify.com/artist/" + topArtists[item].track_id}
        target="_blank"
        rel="noopener noreferrer"
      >
        {i < 6 && <img src={topArtists[item]["images"][0]} alt="artist" />}
      </a>
    ));

  const getTopArtists = async (email) => {
    setTopArtists(await UserService.getTopArtists(email));
  };

  // check if component mounted
  React.useEffect(() => {
    getTopArtists(userEmail);

    /*
    if (auth.currentUser) {
      getTopArtists(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getTopArtists(user.email);
        }
      });
    }
    */
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
