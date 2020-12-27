import React from "react";
import { AppBar, Typography } from "@material-ui/core";

function AppHeader() {
  return (
    <AppBar position="static">
      <div id="headerFlex">
        <Typography variant="h3" component="span">
          BeerCount
        </Typography>
      </div>
    </AppBar>
  );
}

export default AppHeader;
