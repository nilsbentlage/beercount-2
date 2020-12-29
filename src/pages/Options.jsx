import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";

import { useRecoilValue } from "recoil";
import userState from "../atoms/userState";

function Options() {
  const user = useRecoilValue(userState);

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
    <div id="options">
      <Typography variant="h2">Options</Typography>
      <br />
      <br />
      <Card
        style={{ display: "inline-block", maxWidth: "90%", padding: "24px" }}
        variant="outlined"
        raised={true}
        component="div"
      >
        <Typography variant="body2">
          You are logged in as {user.displayName} <br />
        </Typography>
        <Typography variant="overline">{user.email}</Typography>
        <br />
        <br />
        <Button
          variant="contained"
          raised="true"
          color="primary"
          onClick={Logout}
        >
          Logout
        </Button>
      </Card>
      <br />
      <br />
      <Typography variant="body1">
        Copyright & Support
        <br />
        <Link to="mailto:bentlage@symmedia.de" alt="E-Mail">
          Nils Bentlage
        </Link>
      </Typography>{" "}
    </div>
  );
}

export default Options;
