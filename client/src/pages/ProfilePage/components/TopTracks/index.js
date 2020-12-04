import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import "./index.css";

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState("");

  const TrackLister = ({ topTracks }) =>
    Object.keys(topTracks).map((item, i) => (
      <div>
        {i < 6 ? (
          <a
            href={"https://open.spotify.com/track/" + topTracks[item].track_id}
          >
            <div className="trackelement">
              <div className="columns">
                <img src={topTracks[item]["images"][2]} alt="album" />

                <div className="trackcontent">
                  <h2>{topTracks[item].track_name}</h2>
                  {/*<p className="body">{topTracks[item].track_album}</p>
                  <p className="body">{topTracks[item].track_artist}</p>*/}
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
    let userEmail = fb.auth().currentUser.email;
    getTopTracks(userEmail);
  }, []);

  return (
    <div>
      <h2 className="title"> Top Tracks </h2>
      <TrackLister topTracks={topTracks} />
    </div>
  );
};

export default TopTracks;
