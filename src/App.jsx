import { useEffect } from "react";
import "./App.sass";
import { Switch, Route } from "react-router-dom";

import firebase from "firebase/app";
import firebaseConfig from "./config/firebase";
import "firebase/auth";

import WebFont from "webfontloader";

import BottomMenu from "./components/BottomMenu";
import AppHeader from "./components/AppHeader";

import Splashscreen from "./pages/Splashscreen";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Options from "./pages/Options";

import { useRecoilState, useSetRecoilState } from "recoil";
import userState from "./atoms/userState";
import entryArray from "./atoms/entryArray";
import personalCounter from "./atoms/personalCounter";

import { BrowserRouter as Router } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

function App() {
  WebFont.load({
    google: {
      families: ["Roboto Slab", "Roboto"],
    },
  });

  const [user, setUser] = useRecoilState(userState);
  const setEntryArray = useSetRecoilState(entryArray);
  const setPersonalCounter = useSetRecoilState(personalCounter);

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

  useEffect(() => {
    firebase
      .database()
      .ref("/users")
      .on("value", (allUserIds) => {
        let output = [];
        for (let userId in allUserIds.val()) {
          let name = allUserIds.val()[userId].name;
          let value = allUserIds.val()[userId].count;
          let key = userId;
          output.push({ id: key, name: name, value: value });
          if (userId === user.uid) {
            setPersonalCounter(value);
          }
        }
        setEntryArray(output);
      });
  }, [setPersonalCounter, setEntryArray, user]);

  return (
    <div className="App">
      <AppHeader />
      <Router>
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
  );
}
export default App;
