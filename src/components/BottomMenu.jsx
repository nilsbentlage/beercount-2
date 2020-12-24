import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";
import { Redirect } from "react-router-dom";

function BottomMenu() {
  // const history = useHistory();

  const handleChange = (newValue) => {
    let newPath = "/" + newValue;
    <Redirect to={newPath} from="/" />;
  };

  return (
    <BottomNavigation
      // onChange={(event, newValue) => (window.location.href = "/" + newValue)}
      onChange={(event, newValue) => handleChange(newValue)}
      showLabels
    >
      <BottomNavigationAction
        value="home"
        label="Pick'n'Pay"
        icon={<AddCircleOutlineIcon />}
      />
      <BottomNavigationAction
        value="accounts"
        label="Accounts"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        value="options"
        label="Options"
        icon={<InfoIcon />}
      />
    </BottomNavigation>
  );
}

export default BottomMenu;
