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
import "./phase.css";
import UnassignedStdTable from "../../Components/UnassignedStdTable";
import { motion } from "framer-motion";
import CheckModal from "../../Components/CheckModal";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";


const PhaseControl = () => {
  const [phase1, setPh1] = useState();
  const [phase2, setPh2] = useState();
  const [phase3, setPh3] = useState();
  let token = secureLocalStorage.getItem("token");
      const headers = {
        authorization: `${token}`,
      };
  useEffect(() => {
    
    setPh1(secureLocalStorage.getItem("ph1"));
    // console.log(secureLocalStorage.getItem("ph1"));
    setPh2(secureLocalStorage.getItem("ph2"));
    setPh3(secureLocalStorage.getItem("ph3"));
  });

  const startCourseHandler = async (e) => {
    e.preventDefault();
    secureLocalStorage.setItem("ph1", true); // Set value in secureLocalStorage
    setPh1(true);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };

    const body = {
      ph1: true,
    };
    let res;
    try {
      res = await axios.post("http://localhost:4000/ph1", body, {
        headers: headers,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const endCourseHandler = async (e) => {
    e.preventDefault();
    secureLocalStorage.setItem("ph1", false); // Set value in secureLocalStorage

    setPh1(false);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    let res;
    const body = {
      ph1: false,
    };
    try {
      res = await axios.post("http://localhost:4000/ph1", body, {
        headers: headers,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const startStudentHandler = async (e) => {
    e.preventDefault();
    secureLocalStorage.setItem("ph2", true); // Set value in secureLocalStorage
    setPh2(true);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    let res;
    const body = {
      ph2: true,
    };
    try {
      res = await axios.post("http://localhost:4000/ph2", body, {
        headers: headers,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const endStudentHandler = async (e) => {
    e.preventDefault();
    secureLocalStorage.setItem("ph2", false); // Set value in secureLocalStorage

    setPh2(false);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    let res;
    const body = {
      ph2: false,
    };
    try {
      res = await axios.post("http://localhost:4000/ph2", body, {
        headers: headers,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const startFacultyHandler = async (e) => {
    e.preventDefault();
    secureLocalStorage.setItem("ph3", true); // Set value in secureLocalStorage
    setPh3(true);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    let res;
    const body = {
      ph3: true,
    };
    try {
      res = await axios.post("http://localhost:4000/ph3", body, {
        headers: headers,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const endFacultyHandler = async (e) => {
    e.preventDefault();
    secureLocalStorage.setItem("ph3", false); // Set value in secureLocalStorage

    setPh3(false);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };

    const body = {
      ph3: false,
    };
    let res;
    try {
      res = await axios.post("http://localhost:4000/ph3", body, {
        headers: headers,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const allocationHandler=async () =>{
    try {
      
      const res=await axios.get("http://localhost:4000/algorithm",{
        headers:headers,
      });
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      console.log(e.message);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  let navigate = useNavigate(); 
  const routeChange =async (e) =>{
    e.preventDefault();
    try {
      const link = document.createElement("a");
      link.href = "http://localhost:4000/finalalloc";
      // link.setAttribute("download", `Faculty.xlsx`);

      // document.body.appendChild(link);

      link.click();

      // link.parentNode.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      className="ta__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="ta-form">
        {/* Conditional rendering based on ph1 state */}
        {!phase1 && (
          <Typography variant="h4" gutterBottom>
            To Start Course Phase
          </Typography>
        )}
        {!phase1 && (
          <Button
            variant="contained"
            onClick={startCourseHandler}
            sx={{ marginTop: 1,marginBottom:3, backgroundColor: "#3F51B5" }}
          >
            Start Course Phase
          </Button>
        )}
        
        {phase1 && (
          <Typography variant="h4" gutterBottom>
            To End Course Phase
          </Typography>
        )}
        {phase1 && (
          <Button
            variant="contained"
            onClick={endCourseHandler}
            sx={{ marginTop: 1, marginBottom:3, backgroundColor: "#3F51B5" }}
          >
            End Course Phase
          </Button>
        )}
        {// PHASE 2
        }
        {!phase2 && (
          <Typography variant="h4" gutterBottom>
            To Start Student Phase
          </Typography>
        )}
        {!phase2 && (
          <Button
            variant="contained"
            onClick={startStudentHandler}
            sx={{ marginTop: 1, marginBottom:3,backgroundColor: "#3F51B5" }}
          >
            Start Student Phase
          </Button>
        )}
        {phase2 && (
          <Typography variant="h4" gutterBottom>
            To End Student Phase
          </Typography>
        )}
        {phase2 && (
          <Button
            variant="contained"
            onClick={endStudentHandler}
            sx={{ marginTop: 1, marginBottom:3,backgroundColor: "#3F51B5" }}
          >
            End Student Phase
          </Button>
        )}
        {// PHASE 3
        }
        {!phase3 && (
          <Typography variant="h4" gutterBottom>
            To Start Faculty Phase
          </Typography>
        )}
        {!phase3 && (
          <Button
            variant="contained"
            onClick={startFacultyHandler}
            sx={{ marginTop: 1, marginBottom:3, backgroundColor: "#3F51B5" }}
          >
            Start Faculty Phase
          </Button>
        )}
        {phase3 && (
          <Typography variant="h4" gutterBottom>
            To End Faculty Phase
          </Typography>
        )}
        {phase3 && (
          <Button
            variant="contained"
            onClick={endFacultyHandler}
            sx={{ marginTop: 1 ,marginBottom:3, backgroundColor: "#3F51B5" }}
          >
            End Faculty Phase
          </Button>
        )}
        <Typography variant="h4" gutterBottom>
            To Start Allocation 
        </Typography>
        <Button
            variant="contained"
            onClick={allocationHandler}
            sx={{ marginTop: 1 ,marginBottom:3, backgroundColor: "#3F51B5" }}
          >
           Start Allocation
        </Button>
        <Typography variant="h4" gutterBottom>
            To Download Allocation CSV file 
        </Typography>
        <Button
            variant="contained"
            onClick={routeChange}
            sx={{ marginTop: 1 ,marginBottom:3, backgroundColor: "#3F51B5" }}
          >
            Download
        </Button>
      </div>
    </motion.div>
  );
};

export default PhaseControl;
