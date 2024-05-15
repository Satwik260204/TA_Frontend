import React, { Fragment } from "react";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Table,
  Typography,
  
} from "@mui/material";
import "./CustomTable.css";
import { motion } from "framer-motion";

const AppliedTable = (props) => {
    if (props.courseData.length === 0) {
        return (
          <motion.div>
            <Typography
              variant="h5"
              gutterBottom
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              No TA positions applied!
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
                    <TableCell className="table__cell">PREFERENCES</TableCell>
                    <TableCell className="table__cell">COURSE CODE</TableCell>
                    <TableCell className="table__cell">COURSE NAME</TableCell>
                    <TableCell className="table__cell">FACULTY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.courseData.map((course,index) => {
                    return (
                      <Fragment key={course._id}>
                        <TableRow>
                          <TableCell rowSpan={1}>
                            <Typography variant="body1" gutterBottom>
                              {index+1}
                            </Typography>
                          </TableCell>
                          <TableCell rowSpan={1}>
                            <Typography variant="body1" gutterBottom>
                              {course.code}
                            </Typography>
                          </TableCell>
                          <TableCell>
                          <Typography variant="body1" gutterBottom>
                              {course.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                          <Typography variant="body1" gutterBottom>
                              {course.allocatedFaculty.name}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </motion.div>
      );
}
export default AppliedTable;