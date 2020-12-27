import { DataGrid } from "@material-ui/data-grid";
import Card from "@material-ui/core/Card";
import { Typography } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import entryArray from "../atoms/entryArray";

function Accounts() {
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

  const entries = useRecoilValue(entryArray);

  return (
    <div id="accountList">
      <Typography variant="h2">Account Overview</Typography>
      <br /> <br />
      <Card style={{ height: "50vh" }} variant="outlined" raised={true}>
        <DataGrid autoPageSize={true} rows={entries} columns={columns} />
      </Card>
    </div>
  );
}

export default Accounts;
