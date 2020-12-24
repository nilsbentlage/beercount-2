import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";

import { DataGrid } from "@material-ui/data-grid";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";

function Accounts() {
  const db = firebase.database().ref("/users");
  const columns = [
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "value",
      type: "number",
      headerName: "Saldo",
      width: 80,
      flex: 0,
    },
  ];
  const [entryArray, setEntryArray] = useState([]);

  useEffect(() => {
    console.log("effect running");
    let output = [];

    db.once("value").then((allUserIds) => {
      for (let userId in allUserIds.val()) {
        let name = allUserIds.val()[userId].name;
        let value = allUserIds.val()[userId].count * -1;
        let key = userId;
        output.push({ id: key, name: name, value: value });
      }
      setEntryArray(output);
    });
  }, []);

  return (
    <div id="accountList">
      <Typography variant="h2">Account Overview</Typography>
      <br /> <br />
      <Card style={{ height: "50vh" }} variant="outlined" raised={true}>
        <DataGrid autoPageSize={true} rows={entryArray} columns={columns} />
      </Card>
    </div>
  );
}

export default Accounts;
