import { useEffect } from "react";
import "./App.sass";
import { Switch, Route } from "react-router-dom";

import firebase from "firebase/app";
import firebaseConfig from "./config/firebase";
import "firebase/auth";

import WebFont from "webfontloader";

import BottomMenu from "./components/BottomMenu";
import AppBar from "@material-ui/core/AppBar";
import { Typography } from "@material-ui/core";

import Splashscreen from "./pages/Splashscreen";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Options from "./pages/Options";
import { useSetRecoilState } from "recoil";
import userState from "./atoms/userState";

import foregroundImage from "./foreground.png";

import {Router, useHistory} from 'react-dom'

firebase.initializeApp(firebaseConfig);

function App() {
  WebFont.load({
    google: {
      families: ["Roboto Slab", "Roboto"],
    },
  });

  const setUser = useSetRecoilState(userState);
  const history = useHistory()


  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (answer) => {
        console.log("AppJSX got new user data");
        if (answer) {
          setUser(answer);
          console.log("AppJSX wrote new user data");
        }
      },
      (error) => {
        console.log(error.message);
      }
    );
  }, [setUser]);

    <div className="App">
      <AppBar position="static">
        <div id="headerFlex">
          <Typography variant="h4" component="span">
            BeerCount
          </Typography>
          <img src={foregroundImage} alt="Logo" />
        </div>
      </AppBar>
      <Router history={history}>
      <Switch>
        <Route exact path="/" component={Splashscreen} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/options" component={Options} />
      </Switch>
      <BottomMenu />
      </Router>
    </div>
  ;
}
export default App;
