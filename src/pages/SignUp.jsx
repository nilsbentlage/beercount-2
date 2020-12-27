import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import firebase from "firebase/app";
import "firebase/auth";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [error, setErrorState] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");

  const setError = (error) => {
    setErrorState(error);
    setTimeout(function () {
      setErrorState("");
    }, 4000);
  };

  const createUser = (event) => {
    function registerOnServer() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          function (answer) {
            firebase.auth().currentUser.updateProfile({
              displayName: displayName,
            });
            window.location.href = "/home";
          },
          function (error) {
            setError(error);
          }
        );
    }
    event.preventDefault();
    if (password === repeatPassword) {
      if (displayName.length > 2) {
        registerOnServer();
      } else {
        setError({ message: "Username is shorter than 3 characters." });
      }
    } else {
      setError({ message: "Repeated Password incorrect." });
    }
  };

  return (
    <form>
      <FormGroup>
        <Typography variant="h2">Register</Typography>
        <br /> <br />
        <TextField
          value={email}
          label="E-Mail"
          type="email"
          error={error.code === "auth/invalid-email" ? true : false}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          autoFocus={true}
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
          autoComplete="new-password"
        />
        <TextField
          value={repeatPassword}
          label="Repeat Password"
          type="password"
          helperText={error.a}
          onChange={(event) => setRepeatPassword(event.target.value)}
          autoComplete="new-password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(event) => createUser(event)}
        >
          SignUp
        </Button>
        <Link href="/signin">Go back to login</Link>
      </FormGroup>
      <div className="errorMessage">
        {error && (
          <Typography variant="caption" component="p">
            {error.message}
          </Typography>
        )}
      </div>
    </form>
  );
}

export default SignUp;
