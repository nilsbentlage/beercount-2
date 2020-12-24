import React from "react";
import Typography from "@material-ui/core/Typography";
import { useRecoilValue } from "recoil";
import userState from "../atoms/userState";
import {Redirect} from 'react-router-dom'
  
function Splashscreen() {
  const user = useRecoilValue(userState).uid;

  user ? <Redirect to="/home" /> : console.log("no user found");

  setTimeout(function () {
    <Redirect to="/signin" />;
  }, 1000);

  return (
    <div id="Splashscreen">
      <img
        id="Splash-FG"
        src={process.env.PUBLIC_URL + "/spinner.svg"}
        alt="Foreground"
      />
      <Typography style={{ maxWidth: "70vw" }}>
        Checking authentication
      </Typography>
    </div>
  );
}

export default Splashscreen;
