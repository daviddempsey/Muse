import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import "./index.css";
const auth = fb.auth();

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState("");

  const ArtistLister = ({ topArtists }) =>
    Object.keys(topArtists).map((item, i) => (
      <a href={"https://open.spotify.com/artist/" + topArtists[item].track_id}>
        {i < 6 ? (
          <img src={topArtists[item]["images"][2]} alt="artist" />
        ) : null}
      </a>
    ));

  const getTopArtists = async (email) => {
    setTopArtists(await UserService.getTopArtists(email));
  };

  // check if component mounted
  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getTopArtists(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getTopArtists(user.email);
        }
      });
    }
  }, []);

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
