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
import { motion } from "framer-motion";

const CustomTable = (props) => {
  if (props.facultyData.length === 0) {
    return (
      <motion.div>
        <Typography
          variant="h5"
          gutterBottom
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Nothing has been allocated yet!
        </Typography>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table aria-label="customized table">
            <TableHead className="table__head">
              <TableRow>
                <TableCell className="table__cell">FACULTY</TableCell>
                <TableCell className="table__cell">DEPARTMENT</TableCell>
                <TableCell className="table__cell">COURSE</TableCell>
                <TableCell className="table__cell">STUDENTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.facultyData.map((faculty) => {
                if (faculty.courses.length !== 0) {
                  return (
                    <Fragment key={faculty._id}>
                      <TableRow>
                        <TableCell rowSpan={faculty.courses.length + 1}>
                          <Typography variant="body1" gutterBottom>
                            {faculty.name}
                          </Typography>
                        </TableCell>
                        <TableCell rowSpan={faculty.courses.length + 1}>
                          <Typography variant="body1" gutterBottom>
                            {faculty.department}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {faculty.courses.map((course) => (
                        <TableRow key={course._id}>
                          <TableCell>
                            <Typography variant="body1" gutterBottom>
                              {course.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Stack>
                              {course.allocatedTA.length !== 0 &&
                                course.allocatedTA.map((ta) => (
                                  <Typography
                                    variant="body1"
                                    gutterBottom
                                    key={ta._id}
                                  >
                                    {ta.name}
                                    {`(${ta.rollNumber})`}
                                  </Typography>
                                ))}
                              {course.allocatedTA.length === 0 && (
                                <Typography variant="body1" gutterBottom>
                                  No TA Selected
                                </Typography>
                              )}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </motion.div>
  );
};

export default CustomTable;
