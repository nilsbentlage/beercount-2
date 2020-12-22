import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

function Home(props) {
  const user = props.user.uid;
  const userName = props.user.displayName;
  const [count, setCount] = React.useState(0);
  const [pay, setPay] = React.useState(false);
  const [account, setAccount] = React.useState();
  const db = firebase.database();
  const userRef = db.ref("/users/" + user);

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
    setCount(0)
  }

  if (count < 0) {
    setCount(0);
  }

  return (
    <div id="home">
      <div>You have to pay {account} beers</div>
      <div>I would like to</div>
      <div>
        <span>PICK</span>
        <Switch
          name="pay"
          value={pay}
          onChange={(event) => setPay(event.target.checked)}
        />
        <span>PAY</span>
      </div>

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
      <Button variant="contained" color="primary" disabled={count === 0 ? true : false} onClick={() => CheckOut()}>
        Checkout
      </Button>
    </div>
  );
}

export default Home;
