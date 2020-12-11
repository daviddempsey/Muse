import React, { useEffect } from "react";
import fb from "../../base";
import "firebase/auth";

const LogoutPage = ({ history }) => {
  useEffect(() => {
    handleLogout();
  });

  const handleLogout = async () => {

    // attempt to sign out of the application
    fb.auth()
      .signOut()
      .then(() => {
        // redirect
        history.push("/");
      })
      .catch((error) => {
        var errorMessage = error.message;

        // log the error to the console
        alert(errorMessage);
      });
  };

  return (
    <></>
  );
};

export default LogoutPage;
