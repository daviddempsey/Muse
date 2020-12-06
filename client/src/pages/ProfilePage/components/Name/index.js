import React, { useState } from "react";
import UserService from "../../../../services/user.service";
import fb from "../../../../base";
import "firebase/auth";
const auth = fb.auth();

const Name = ({ userEmail }) => {
  // uncomment userservice once we get it to work
  // check if component mounted
  const [name, setName] = useState("");

  const getName = async (email) => {
    setName(await UserService.getName(email));
  };

  React.useEffect(() => {
    if (auth.currentUser) {
      let currEmail = fb.auth().currentUser.email;
      if (currEmail.localeCompare(userEmail) === 0) {
        getName(currEmail);
      } else {
        getName(userEmail);
      }
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          if (user.email.localeCompare(userEmail) === 0) {
            getName(user.email);
          } else {
            getName(userEmail);
          }
        }
      });
    }
  }, [userEmail]);

  return <h1 className="title">{name}</h1>;
};

export default Name;
