import "./App.sass";
import { Switch, Route } from "react-router-dom";

import firebase from "firebase/app";
import firebaseConfig from "./config/firebase";
import "firebase/auth";

import useAppInit from "./functions/useAppInit";

import WebFont from "webfontloader";

import BottomMenu from "./components/BottomMenu";
import AppHeader from "./components/AppHeader";

import Splashscreen from "./pages/Splashscreen";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Options from "./pages/Options";

import { BrowserRouter as Router } from "react-router-dom";
import { Grid } from "@material-ui/core";

firebase.initializeApp(firebaseConfig);

function App() {
  WebFont.load({
    google: {
      families: ["Roboto Slab", "Roboto"],
    },
  });

  useAppInit();

  return (
    <Router>
      <Grid container id="App" alignContent="space-between" justify="center">
        <Grid item xs={12}>
          <AppHeader />
        </Grid>
        <Switch>
          <Route exact path="/" component={Splashscreen} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/accounts" component={Accounts} />
          <Route exact path="/options" component={Options} />
        </Switch>
        <Grid item xs={12}>
          <BottomMenu />
        </Grid>
      </Grid>
    </Router>
  );
}
export default App;
