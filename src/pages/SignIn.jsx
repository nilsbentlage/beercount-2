import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

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
          console.log(answer)
          window.location.href = "/home";
        },
        function (error) {
          setError(error);
        }
      );
  };

  return (
    <form>
      <FormGroup>
        <Typography variant="h2">Login</Typography>
        <br /> <br />
        <TextField
          error={error.code === "auth/invalid-email" ? true : false}
          value={email}
          label="E-Mail"
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          autoFocus={true}
        />
        <TextField
          error={error.code === "auth/wrong-password" ? true : false}
          value={password}
          label="Password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
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
      <div className="errorMessage">
        {error.code && (
          <Typography variant="caption" component="p">
            {error.message}
          </Typography>
        )}
      </div>
    </form>
  );
}

export default SignIn;
