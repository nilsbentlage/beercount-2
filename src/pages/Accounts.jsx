import React from "react";
import firebase from "firebase/app";
import "firebase/database";

import { DataGrid } from "@material-ui/data-grid";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";

function Accounts(props) {
  const db = firebase.database().ref("/users");
  const [entryArray, setEntryArray] = React.useState([]);

  React.useEffect(() => {
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
    db.once("value").then((allUserIds) => {
      let output = [];
      for (let userId in allUserIds.val()) {
        let name = allUserIds.val()[userId].name;
        let value = allUserIds.val()[userId].count * -1 + " €";
        let key = userId.slice(0, 4);
        output.push({ id: key, name: name, value: value });
      }
      setEntryArray(
        <DataGrid
          hideFooterPagination={output.length < 10 ? true : false}
          autoPageSize={true}
          rows={output}
          columns={columns}
        />
      );
    });
  }, []);

  return (
    <div id="accountList">
      <Typography variant="h2">Account Overview</Typography><br /> <br />
      <Card style={{ height: "50vh" }} variant="outlined" raised="true">
        {entryArray}
      </Card>
    </div>
  );
}

export default Accounts;
