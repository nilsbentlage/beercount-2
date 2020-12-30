import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

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
    <Grid
      item
      container
      spacing={8}
      xs={12}
      justify="center"
      alignItems="center"
      alignContent="center"
      className="animate"
    >
      <Grid item xs={10}>
        <Typography variant="h2" align="center">
          Options
        </Typography>
      </Grid>
      <Grid item xs={10} component={Card} className="customCard" align="center">
        <Typography variant="body2" align="center">
          You are logged in as {user.displayName} <br />
        </Typography>
        <Typography align="center" variant="overline">
          {user.email}
        </Typography> <br /><br />
        <Button
          variant="contained"
          raised="true"
          color="primary"
          onClick={Logout}
        >Logout</Button>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body1" align="center" color="textPrimary">
          Copyright & Support <br />
          <Link to="mailto:bentlage@symmedia.de" alt="E-Mail">
            Nils Bentlage
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Options;
