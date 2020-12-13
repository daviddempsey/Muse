import React, { useEffect, useState } from "react";
import fb from "../base.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fb.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
      console.log("current User:")
      console.log(user.email);
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};