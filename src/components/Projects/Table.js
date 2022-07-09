import { useContext } from "react";
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { sheetConverter } from "../../models/Sheet";
import { StyledTableCell, StyledTableRow } from "./styles";
import { FirebaseContext } from "../../contexts/firebaseContext";

export default () => {
  const { db } = useContext(FirebaseContext);

  const sheetCollectionRef = collection(db, "sheets").withConverter(
    sheetConverter
  );
  const [sheets, loading, error] = useCollectionData(sheetCollectionRef);

  const deleteSheet = async (id) => {
    const currentRef = doc(db, "sheets", id);
    await deleteDoc(currentRef);
  };

  return (
    <Box sx={{ color: "text.secondary" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>First Created</StyledTableCell>
            <StyledTableCell>Last Modified</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading &&
            sheets.map((sheet) => {
              return (
                <StyledTableRow key={sheet.name}>
                  <TableCell align="center">
                    <Link to={`${sheet.id}`}>{sheet.name}</Link>
                  </TableCell>
                  <TableCell align="center">{sheet.location}</TableCell>
                  <TableCell align="center">
                    {new Date(
                      sheet.createdAt.seconds * 1000
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(
                      sheet.lastEditedAt.seconds * 1000
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </TableCell>

                  <TableCell align="center">
                    <Link to={`${sheet.id}`}>
                      <EditIcon sx={{ color: "#202020" }} />
                    </Link>
                  </TableCell>

                  <TableCell align="center">
                    <DeleteIcon
                      onClick={() => {
                        deleteSheet(sheet.id);
                      }}
                    />
                  </TableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </Box>
  );
};