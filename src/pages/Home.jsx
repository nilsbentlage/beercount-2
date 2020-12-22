import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Home(props) {
  const user = props.user.uid;
  const userName = props.user.displayName;
  const [count, setCount] = React.useState(0);
  const [pay, setPay] = React.useState(false);
  const [account, setAccount] = React.useState();
  const db = firebase.database();
  const userRef = db.ref("/users/" + user);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function GetBeers() {
      console.log("start getbeers");
      userRef.on("value", function (value) {
        let output = () => {
          try {
            return value.val().count;
          } catch {
            return 0;
          }
        };
        setAccount(output);
      });
    }
    GetBeers();
  }, [account, userRef]);

  function CheckOut() {
    const factor = pay ? -1 : 1;
    const value = count * factor;
    console.log(value);
    console.log(account);
    userRef.set({
      count: account + value,
      name: userName,
    });
    setCount(0);
    setOpen(false);
  }

  if (count < 0) {
    setCount(0);
  }

  return (
    <div id="home">
      <Typography>You have to pay {account} beers!</Typography>
      <Typography variant="h4">
        I would like to <br />
        <span>PICK</span>
        <Switch
          name="pay"
          value={pay}
          onChange={(event) => setPay(event.target.checked)}
        />
        <span>PAY</span>
        <div>
          <Fab onClick={() => setCount(count - 1)}>
            <SubtractIcon />
          </Fab>
          <span id="output">{count}</span>
          <Fab onClick={() => setCount(count + 1)}>
            <AddIcon />
          </Fab>
        </div>
        <div>Beers</div>
      </Typography>

      <Button
        variant="contained"
        color="primary"
        disabled={count === 0 ? true : false}
        onClick={() => setOpen(true)}
      >
        Checkout
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are going to {pay ? "pay" : "pick"} {count} beers.
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
    </div>
  );
}

export default Home;
