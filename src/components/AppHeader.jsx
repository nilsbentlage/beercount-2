import React from "react";
import foreground from "../foreground.png";

function AppHeader() {
  return (
    <div id="header">
      <img src={foreground} alt="Logo" />
    </div>
  );
}

export default AppHeader;
