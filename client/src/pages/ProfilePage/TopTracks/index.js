import React, { useState } from "react";
import UserService from "../../../services/user.service";
import "./index.css";

const TopTracks = ({ userEmail }) => {
  const [topTracks, setTopTracks] = useState("");

  const TrackLister = ({ topTracks }) =>
    Object.keys(topTracks).map((item, i) => (
      <div key={i}>
        {i < 5 && (
          <a
            href={"https://open.spotify.com/track/" + topTracks[item].track_id}
            target="_blank"
            rel="noopener noreferrer"
            key={"spotifyLink"}
          >
            <div className="trackelement" key="trackelement">
              <div className="columns" key="columns">
                <img src={topTracks[item]["images"][0]} key="album" alt="album" />

                <div className="trackcontent" key="trackcontent">
                  <h2 style={{ marginBottom: "2px" }} key="h2">
                    {i + 1}. {topTracks[item].track_name}
                  </h2>
                  <p className="body" key="p1">{topTracks[item]["album_name"]}</p>
                  <div className="body" key="body">
                    {topTracks[item]["artists"].map((artist, i) =>
                      topTracks[item]["artists"][i + 1] ? (
                        <p className="body" key="p2">{artist}, </p>
                      ) : (
                        <p className="body" key="p3">{artist}</p>
                      )
                    )}
                  </div>
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
