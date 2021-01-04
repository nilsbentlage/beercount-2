import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import { useRecoilValue } from "recoil";
import userState from "../atoms/userState";
import personalCounter from "../atoms/personalCounter";

function Home() {
  const user = useRecoilValue(userState);
  const account = useRecoilValue(personalCounter);
  const [count, setCount] = React.useState(0);
  const [pay, setPay] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const db = firebase.database();
  const userRef = db.ref("/users/" + user.uid);

  function CheckOut() {
    setOpen(false);
    const factor = pay ? 1 : -1;
    const value = count * factor;
    const newValue = account + value;
    userRef.set({
      count: newValue,
      name: user.displayName,
    });
    setCount(0);
  }

  if (count < 0) {
    setCount(0);
  }

  return (
    <>
      <Grid
        item
        xs={12}
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        spacing={8}
        className="animate"
      >
        <Grid item xs={10}>
          <Typography variant="h2">Pick'n'Pay</Typography>
        </Grid>
        <Grid
          item
          xs={10}
          container
          component={Paper}
          spacing={2}
          direction="column"
          alignItems="center"
          className="customCard"
        >
          <Grid item xs={12}>
            <Typography>
              You have to pay{" "}
              <Typography
                color={account < 0 ? "secondary" : "primary"}
                component="span"
              >
                {account * -1} beer{account > 1 || account < -1 ? "s" : ""}!
              </Typography>
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">
              I would like to <br />
              PICK
              <Switch
                name="pay"
                value={pay}
                onChange={(event) => setPay(event.target.checked)}
              />
              PAY
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Fab
              onClick={() => {
                setCount(count - 1);
              }}
            >
              <SubtractIcon />
            </Fab>
            <span id="output">{count}</span>
            <Fab onClick={() => setCount(count + 1)}>
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Beers</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              raised="true"
              color="primary"
              disabled={count === 0 ? true : false}
              onClick={() => setOpen(true)}
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open}>
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are going to{" "}
            <Typography color="primary" component="span">
              {pay ? "pay" : "pick"} {count} beers.
            </Typography>{" "}
            <br />
            {pay ? "Please give " : "Cost: "}
            <Typography color="primary" component="span">
              {count} €
            </Typography>
            {pay ? " to Thomas Gröger" : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={CheckOut} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Home;
