import React from "react";
import "./App.sass";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

import firebaseConfig from "./config/firebase";

import WebFont from "webfontloader";

import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ListIcon from "@material-ui/icons/List";
import InfoIcon from "@material-ui/icons/Info";

import Splashscreen from "./pages/Splashscreen";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Options from "./pages/Options";
import { Typography } from "@material-ui/core";

firebase.initializeApp(firebaseConfig);

function App() {
  WebFont.load({
    google: {
      families: ["Roboto Slab", "Roboto"],
    },
  });

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((answer) => {
      if (answer) {
        setUser(answer);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="App">
      <AppBar position="static">
        <div id="headerFlex"><img src={process.env.PUBLIC_URL + "/foreground.png"} alt="Logo" /><Typography variant="h4" component="span">BeerCount</Typography></div>
      </AppBar>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Splashscreen user={user} />
          </Route>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home">
            <Home user={user} />
          </Route>
          <Route path="/accounts" component={Accounts} />
          <Route path="/options" component={Options} />
        </Switch>
      </BrowserRouter>
      {user ? (
        <BottomNavigation
          onChange={(event, newValue) => {
            window.location.href = newValue;
          }}
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
      ) : (
        <div>
          <br />
        </div>
      )}
    </div>
  );
}

export default App;
