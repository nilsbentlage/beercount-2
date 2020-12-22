import React from "react";
import firebase from "firebase/app";
import "firebase/database";

import { DataGrid } from "@material-ui/data-grid";

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
        width: 100,
        flex: 0,
      },
    ];
    db.once("value").then((allUserIds) => {
      let output = [];
      for (let userId in allUserIds.val()) {
        let name = allUserIds.val()[userId].name;
        let value = allUserIds.val()[userId].count;
        let key = userId.slice(0, 4);
        output.push({ id: key, name: name, value: value });
      }
      setEntryArray(<DataGrid autoPageSize={true} rows={output} columns={columns} />);
    });
  }, [db]);

  return <div id="accountList">{entryArray}</div>;
}

export default Accounts;
