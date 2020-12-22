import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

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
      <Typography variant="h2">Options</Typography>
      <br /> <br />
      <Typography variant="body1">
        Copyright & Support
        <br />
        Nils Bentlage
      </Typography>
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={Logout}>
        Logout
      </Button>
    </div>
  );
}

export default Options;
