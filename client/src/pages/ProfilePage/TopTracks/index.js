import React, { useState } from "react";
import UserService from "../../../services/user.service";
import "./index.css";

const TopTracks = ({ userEmail }) => {
  const [topTracks, setTopTracks] = useState("");

  const TrackLister = ({ topTracks }) =>
    Object.keys(topTracks).map((item, i) => (
      <div>
        {i < 5 && (
          <a
            href={"https://open.spotify.com/track/" + topTracks[item].track_id}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="trackelement">
              <div className="columns">
                <img src={topTracks[item]["images"][0]} alt="album" />

                <div className="trackcontent">
                  <h2>
                    {i + 1}. {topTracks[item].track_name}
                  </h2>
                  <p className="body">{topTracks[item]["album_name"]}</p>
                  <p className="body">
                    {topTracks[item]["artists"].map((artist, i) =>
                      topTracks[item]["artists"][i + 1] ? (
                        <p className="body">{artist}, </p>
                      ) : (
                        <p className="body">{artist}</p>
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>
          </a>
        )}
      </div>
    ));

  const getTopTracks = async (email) => {
    setTopTracks(await UserService.getTopTracks(email));
  };

  // check if component mounted
  React.useEffect(() => {
    getTopTracks(userEmail);
    /*
    if (auth.currentUser) {
      getTopTracks(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getTopTracks(user.email);
        }
      });
    }
    */
  }, [userEmail]);

  return (
    <div>
      <h2 className="title"> Top Tracks </h2>
      <TrackLister topTracks={topTracks} />
    </div>
  );
};

export default TopTracks;
