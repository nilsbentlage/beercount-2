import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";

import firebase from "firebase/app";
import "firebase/auth";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [error, setErrorState] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const setError = (error) => {
    setErrorState(error.message);
    setTimeout(function () {
      setErrorState("");
    }, 4000);
  };

  const createUser = () => {
    if (password === repeatPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          function (user) {
            firebase.auth().currentUser.updateProfile({
              displayName: displayName,
            });
            window.location.href = "/home";
            setEmail("");
            setPassword("");
            setDisplayName("");
            setRepeatPassword("");
          },
          function (error) {
            setError(error);
          }
        );
    } else {
      setError("Repeated Password is incorrect");
    }
  };

  return (
    <FormGroup>
      <TextField
        value={email}
        label="E-Mail"
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        value={displayName}
        label="Username"
        type="text"
        onChange={(event) => setDisplayName(event.target.value)}
      />
      <TextField
        value={password}
        label="Password"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        value={repeatPassword}
        label="Repeat Password"
        type="password"
        helperText={error}
        onChange={(event) => setRepeatPassword(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={createUser}
      >
        SignUp
      </Button>
      <a href="/signin">Go back to login</a>
    </FormGroup>
  );
}

export default SignUp;
