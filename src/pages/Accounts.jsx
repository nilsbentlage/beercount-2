import { DataGrid } from "@material-ui/data-grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { useRecoilValue } from "recoil";
import entryArray from "../atoms/entryArray";

function Accounts() {
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "value",
      type: "number",
      headerName: "Saldo",
      width: 80,
      flex: 1,
    },
  ];

  let entries = useRecoilValue(entryArray);

  return (
    <Grid
      item
      container
      className="animate"
      spacing={8}
      xs={12}
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item xs={10}>
        <Typography variant="h2" align="center">
          Account Overview
        </Typography>
      </Grid>
      <Grid component={Card} item xs={10} id="dataGrid" className="customCard">
        <DataGrid autoPageSize={true} rows={entries} columns={columns}/>
      </Grid>
    </Grid>
  );
}

export default Accounts;
