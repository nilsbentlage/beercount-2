import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";
import { NavLink } from "react-router-dom";

import { useRecoilValue } from "recoil";
import userState from "../atoms/userState";

function BottomMenu() {
  const user = useRecoilValue(userState);

  return (
    user.uid !== 0 ? (
      <BottomNavigation showLabels>
        <BottomNavigationAction
          component={NavLink}
          to="/home"
          value="home"
          label="Pick'n'Pay"
          icon={<AddCircleOutlineIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/accounts"
          value="accounts"
          label="Accounts"
          icon={<ListIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/options"
          value="options"
          label="Options"
          icon={<InfoIcon />}
        />
      </BottomNavigation>
    ) : <div />
  );
}

export default BottomMenu;
