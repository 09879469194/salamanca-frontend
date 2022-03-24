import { Button, Stack, TextField } from "@mui/material";
//import { DataGrid } from "@mui/x-data-grid";
import DataGrid from "react-data-grid";
import { Flex, TableContainer } from "./styles";
import { columns } from "../../data/columns";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Speech } from "../../components";

function Sheet({ setName, pollens, sheetId, loading, addPollen, handleEdit }) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <div style={{ width: "50%" }}>
          <Typography
            noWrap
            variant="h6"
            component="div"
            style={{ color: "#b6b5b5" }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Add a New Name
          </Typography>
          <br />
          <Stack direction={"row"} spacing={2}>
            <TextField
              label={"Name"}
              color={"primary"}
              variant={"outlined"}
              onChange={(e) => setName(e.target.value)}
            />
            <Button color={"primary"} variant={"contained"} onClick={addPollen}>
              {" "}
              Add
            </Button>
          </Stack>
        </div>
        <div
          style={{
            width: "25%",
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 40,
          }}
        >
          <Typography
            noWrap
            variant="h6"
            component="div"
            style={{ color: "#b6b5b5" }}
            sx={{ display: { xs: "none", sm: "block" } }}
            align="center"
          >
            Click to Start Listening
          </Typography>
          <br />
          <Speech pollens={pollens} sheetId={sheetId} />
        </div>
      </Box>
      <br />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} />
      <div align="left" style={{ width: "100%" }}>
        <Box sx={{ display: "flex-inline" }}>
          <br />
          <Typography
            noWrap
            variant="h6"
            component="div"
            style={{ color: "#b6b5b5" }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            View and Edit
          </Typography>
          <br />
          <TableContainer>
            <Flex>
              {pollens && (
                <DataGrid
                  columns={columns}
                  rows={pollens.map((p) => ({
                    id: p.id,
                    name: p.name,
                    ...p.intervals,
                  }))}
                  style={{ width: "80%" }}
                />
              )}
              {/*pollens && (
                <DataGrid
                  sx={{
                    color: "#b6b5b5",
                    boxShadow: 2,
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#0a1c31",
                      color: "#b6b5b5",
                    },
                    "& .MuiDataGrid-columnSeparator": {
                      color: "#b6b5b5",
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#f0f0f0",
                      color: "#0a1c31",
                    },
                    backgroundColor: "#0a1c31",
                  }}
                  rowsPerPageOptions={[100]}
                  columns={content}
                  rows={pollens.map((p) => ({
                    id: p.id,
                    name: p.name,
                    ...p.intervals,
                  }))}
                  onRowClick={(row) => console.log(row)}
                  //onCellEditCommit={handleEdit}
                />
              )*/}
            </Flex>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
}

export default Sheet;
