import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Link from '@material-ui/core/Link'

import firebase from "firebase/app";
import "firebase/auth";

function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setErrorState] = React.useState("");

  const setError = (error) => {
    setErrorState(error);
    setTimeout(function () {
      setErrorState("");
    }, 4000);
  };

  const Login = (event) => {
    event.preventDefault();
    console.log("event triggered");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        function (answer) {
          setEmail("");
          setPassword("");
          window.location.href = "/home";
          console.log("success");
        },
        function (error) {
          setError(error);
          console.log(error);
        }
      );
  };

  return (
    <form>
      <FormGroup>
        <TextField
          error={error.code === "auth/invalid-email" ? true : false}
          value={email}
          label="E-Mail"
          onChange={(event) => setEmail(event.target.value)}
          helperText={
            error.code === "auth/invalid-email" ? error.message : null
          }
          autoComplete="email"
          autoFocus={true}
        />
        <TextField
          error={error.code === "auth/wrong-password" ? true : false}
          value={password}
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          helperText={
            error.code === "auth/wrong-password" ? error.message : null
          }
          autoComplete="current-password"

        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          onClick={(event) => Login(event)}
        >
          Login
        </Button>
        <Link href="/signup">Create a new Account</Link>
      </FormGroup>
    </form>
  );
}

export default SignIn;
