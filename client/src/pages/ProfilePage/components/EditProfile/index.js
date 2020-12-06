import React from "react";
import "./index.css";

const EditProfile = () => {
  const togglePop = () => {
    document.getElementById("popup").style.display = "initial";
    document.getElementById("page").style.filter = "blur(2px) brightness(0.5)";
    document.getElementById("page").style.pointerEvents = "none";
    document.getElementById("page").style.userSelect = "none";
  };

  return (
    <div>
      <button className="edit" onClick={togglePop}>
        <h3>Edit Profile</h3>
      </button>
    </div>
  );
};

export default EditProfile;
