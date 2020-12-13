import React, { useState } from "react";
import UserService from "../../../services/user.service";
import "./index.css";

const TopGenres = ({ userEmail }) => {
  const [topGenres, setTopGenres] = useState("");

  const GenreLister = ({ topGenres }) =>
    Object.keys(topGenres).map((item, i) => (
      <div key={i}>
        {(i + 1) % 3 === 2 && i < 6 && (
          <div className="element" key="element">
            <h3 className="number" key="number1">{i + 1}.</h3> 
            <h3>{topGenres[item].genre_name}</h3>
          </div>
        )}
        {(i + 1) % 3 === 1 && i < 6 && (
          <div className="element2" key="element2">
            <h3 className="number" key="number2">{i + 1}.</h3>
            <h3>{topGenres[item].genre_name}</h3>
          </div>
        )}
        {(i + 1) % 3 === 0 && i < 6 && (
          <div className="element3" key="element3">
            <h3 className="number" key="number3">{i + 1}.</h3>
            <h3>{topGenres[item].genre_name}</h3>
          </div>
        )}
      </div>
    ));

  const getTopGenres = async (email) => {
    setTopGenres(await UserService.getTopGenres(email));
  };

  // check if component mounted
  React.useEffect(() => {
    getTopGenres(userEmail);

    /*
    if (auth.currentUser) {
      getTopGenres(userEmail);
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          getTopGenres(user.email);
        }
      });
    }
    */
  }, [userEmail]);

  return (
    <div>
      <h2 className="title">Top Genres</h2>
      <div className="list">
        <GenreLister topGenres={topGenres} />
      </div>
    </div>
  );
};

export default TopGenres;
