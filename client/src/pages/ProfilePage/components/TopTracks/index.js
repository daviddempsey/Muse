import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import "./index.css";
const auth = fb.auth();

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState("");

  const TrackLister = ({ topTracks }) =>
    Object.keys(topTracks).map((item, i) => (
      <div>
        {i < 5 ? (
          <a
            href={"https://open.spotify.com/track/" + topTracks[item].track_id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="trackelement">
              <div className="columns">
                <img src={topTracks[item]["images"][2]} alt="album" />

                <div className="trackcontent">
                  <h2>
                    {i + 1}. {topTracks[item].track_name}
                  </h2>
                  <p className="body">{topTracks[item]["album_name"]}</p>
                  <p className="body">{topTracks[item]["artists"]}</p>
                </div>
              </div>
            </div>
          </a>
        ) : null}
      </div>
    ));

  const getTopTracks = async (email) => {
    setTopTracks(await UserService.getTopTracks(email));
  };

  // check if component mounted
  React.useEffect(() => {
    if (auth.currentUser) {
      let userEmail = fb.auth().currentUser.email;
      getTopTracks(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getTopTracks(user.email);
        }
      });
    }
  }, []);

  return (
    <div>
      <h2 className="title"> Top Tracks </h2>
      <TrackLister topTracks={topTracks} />
    </div>
  );
};

export default TopTracks;
