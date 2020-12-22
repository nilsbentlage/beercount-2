import React from "react";
import firebase from "firebase/app";
import "firebase/auth";

function Options() {

  const Logout = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(function () {
        window.location.href = "/";
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  return (
    <div>
      <a href="/" onClick={Logout}>
        Logout
      </a>
    </div>
  );
}

export default Options;
