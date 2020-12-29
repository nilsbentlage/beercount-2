import React from "react";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userState";
import { NavLink, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";

import foreGround from "../foreground.png";

function Splashscreen() {
  const user = useRecoilValue(userState).uid;

  return (
    <div id="Splashscreen">
      {user !== 0 ? <Redirect to="/home" /> : console.log("No user found")}
      <img id="Splash-FG" src={foreGround} alt="Foreground" />
      <br />
      <br />
      <Button
        component={NavLink}
        variant="contained"
        color="primary"
        to="/signin"
        style={{ maxWidth: "70vw" }}
      >
        Login
      </Button>
    </div>
  );
}

export default Splashscreen;
