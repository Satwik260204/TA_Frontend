import React, { useEffect, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { useAuth } from "../../Utils/auth";
import { Typography, Button, Backdrop } from "@mui/material";
import CustomTable from "../../Components/CustomTable";
import "./Home.css";
import UnassignedStdTable from "../../Components/UnassignedStdTable";
import { motion } from "framer-motion";
import CheckModal from "../../Components/CheckModal";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import EligibleTable from "../../Components/EligibleTable";
import AppliedTable from "../../Components/AppliedTable";

const StudentHome =  () => {
  const [courseData, setCourseData] = useState("");
  const [appliedCourses,setAppliedCourses]=useState("");
  const [chkOpen, setChkOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCourseData = async () => {

      const stdEmail = JSON.parse(secureLocalStorage.getItem("user")).email;
      let token = secureLocalStorage.getItem("token");
      const headers = {
        authorization: `${token}`,
      };
     
      try {
        const res = await axios.get("http://localhost:4000/applicantcourses", {
          headers: headers,
        });
        
        setCourseData(res.data.data);
        setAppliedCourses(res.data.data2.preferences);
        // console.log(res.data.data2.preferences);
      } catch (e) {
        console.log(e);
      }
    };
    handleCourseData();
  }, []);

  return (
    <motion.div
      className="home__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Typography variant="h4" gutterBottom>
        Eligible Courses
      </Typography>
      <EligibleTable courseData={courseData}></EligibleTable>

      <Typography variant="h4" sx={{ marginTop: 2 }} gutterBottom>
        Applied TA positions
      </Typography>
      <AppliedTable courseData={appliedCourses}></AppliedTable>
    </motion.div>
  );
};

export default StudentHome;