import React from "react";
import Typography from '@material-ui/core/Typography'

function Splashscreen(props) {
  props.user !== 0
    ? (window.location.href = "/home")
    : console.log("no user found");

  setTimeout(function () {
    window.location.href = "/signin";
  }, 3000);

  return (
    <div id="Splashscreen">
      <img
        id="Splash-FG"
        src={process.env.PUBLIC_URL + "/spinner.svg"}
        alt="Foreground"
      />
      <Typography style={{maxWidth: "70vw"}}>Checking authentication</Typography>
    </div>
  );
}

export default Splashscreen;
