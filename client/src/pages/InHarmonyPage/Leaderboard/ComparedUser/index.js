import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import UserService from "../../../../services/user.service";

const ComparedUser = ({ compEmail, compOverall }) => {
  /* store and set the bio for each match */
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");

  // get the bio of each friend from the datacase
  const getBio = async (email) => {
    setBio(await UserService.getBiography(email));
  };

  // get the name of each friend from the database
  const getName = async (email) => {
    setName(await UserService.getName(email));
  };

  // get the profile pic of each friend from the database
  const getPic = async (email) => {
    setPic(await UserService.getProfilePicture(email));
  };

  // check if component mounted
  React.useEffect(() => {
    getBio(compEmail);
    getName(compEmail);
    getPic(compEmail);
  });

  return (
    <div className="ComparedUser">
      <img alt="profile pic not found" src={pic} />
      <div className="Text">
        <h2>
          <Link
            to={"/profile/" + btoa(compEmail)}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            {name}
          </Link>
        </h2>
        <p className="Bio">{bio}</p>
      </div>
      <h1 className="Score">{compOverall}%</h1>
    </div>
  );
};

export default ComparedUser;
