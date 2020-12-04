import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base.js";
import "./index.css";

const TopGenres = () => {
  const [topGenres, setTopGenres] = useState("");

  const GenreLister = ({ topGenres }) =>
    Object.keys(topGenres).map((item, i) => (
      <li key={i}>
        <span>{topGenres[item].genre_name}</span>
      </li>
    ));

  const getTopGenres = async (email) => {
    setTopGenres(await UserService.getTopGenres(email));
  };

  // check if component mounted
  React.useEffect(() => {
    let userEmail = fb.auth().currentUser.email;
    getTopGenres(userEmail);
  }, []);

  return (
    <div id="topstats">
      <div id="topgenres">
        <h1>Top Genres</h1>
        <GenreLister topGenres={topGenres} />
      </div>
    </div>
  );
};

export default TopGenres;
