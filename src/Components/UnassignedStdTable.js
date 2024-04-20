import React, { Fragment } from "react";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Table,
  Card,
  Typography,
  Stack,
  Toolbar,
  Button,
  Tooltip,
  Grid,
} from "@mui/material";
import "./CustomTable.css";
import { hover } from "@testing-library/user-event/dist/hover";
import { Download } from "react-feather";

const UnassignedStdTable = (props) => {
  if (props.studentData.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        Nothing has been allocated yet!
      </Typography>
    );
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="customized table">
          <TableHead className="table__head">
            <TableRow>
              <TableCell className="table__cell">STUDENT</TableCell>
              <TableCell className="table__cell">DEPARTMENT</TableCell>
              <TableCell className="table__cell">EMAIL</TableCell>
              <TableCell className="table__cell">ROLL NUMBER</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.studentData.map((student) => {
              if (student.isAssgined === false) {
                return (
                  <Fragment key={student._id}>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.department}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.rollNumber}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UnassignedStdTable;
