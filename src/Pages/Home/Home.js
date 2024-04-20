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


const Home = () => {

  const [facultyData, setFacultyData] = useState("");
  const [studentData, setStudentData] = useState("");
  const [chkOpen, setChkOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  // console.log(auth.freeze);

  useEffect(() => {
    const handleCourseData = async () => {
      const facEmail = JSON.parse(secureLocalStorage.getItem("user")).email;
      let token = secureLocalStorage.getItem("token");
      const headers = {
        authorization: `${token}`,
      };

      try {
        const res = await axios.get("http://localhost:4000/faculties", {
          headers: headers,
        });

         //console.log(res.data.data);

        setFacultyData(res.data.data);
      } catch (e) {
        console.log(e);
      }

      try {
        const res = await axios.get("http://localhost:4000/students", {
          headers: headers,
        });
        // const res3=await.axios.get("http://localhost:4000/algorithm",{
        //   headers:headers,
        // });

        //console.log(res.data.data);

        setStudentData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    handleCourseData();
  }, []);
  
  const changeChkModalHandler = (opt) => {
    setChkOpen(opt);
  };

  const unfreeszeAllHandler = async () => {
    setChkOpen(false);
    setOpen(true);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    try {
      const res = await axios.get("http://localhost:4000/unfreezeAll", {
        headers: headers,
      });
      console.log(res);
      secureLocalStorage.setItem("freeze", false);
      auth.setFreeze(false);
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setOpen(false);
  };

  const freeszeAllHandler = async () => {
    setChkOpen(false);
    setOpen(true);
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    try {
      const res = await axios.get("http://localhost:4000/freezeAll", {
        headers: headers,
      });
      console.log(res);
      secureLocalStorage.setItem("freeze", true);
      auth.setFreeze(true);
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setOpen(false);
  };

  return (
    <motion.div
      className="home__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Typography variant="h4" gutterBottom>
        Allocation List
      </Typography>
      <CustomTable facultyData={facultyData}></CustomTable>
      <Typography variant="h4" sx={{ marginTop: 2 }} gutterBottom>
        Unassigned Student List
      </Typography>
      <UnassignedStdTable studentData={studentData}></UnassignedStdTable>
      {secureLocalStorage.getItem("role") == "super_admin" && (
        <div>
          <Typography sx={{ marginTop: 2 }}>
            To {secureLocalStorage.getItem("freeze") ? "Unfreeze" : "Freeze"}{" "}
            the allocation click here:
          </Typography>
          {!secureLocalStorage.getItem("freeze") && (
            <Button
              variant="contained"
              onClick={freeszeAllHandler}
              sx={{ marginTop: 1, backgroundColor: "#3F51B5", width: "87.6px" }}
              size="medium"
            >
              Freeze
            </Button>
          )}
          {secureLocalStorage.getItem("freeze") && (
            <Button
              variant="contained"
              color="error"
              onClick={unfreeszeAllHandler}
              sx={{ marginTop: 2 }}
              size="medium"
            >
              UnFreeze
            </Button>
          )}
        </div>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {/* <CircularProgress color="inherit" /> */}
        <div className="modal__plane">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#3F51B5", "#3F51B5", "#3F51B5", "#3F51B5", "#3F51B5"]}
          />
          <Typography variant="h4" sx={{ color: "#BFBFBF" }}>
            Waiting for Response...
          </Typography>
        </div>
      </Backdrop>
      <CheckModal
        chkOpen={chkOpen}
        changeChkModalHandler={changeChkModalHandler}
        str="Do you want to change Allocation phase?"
        deleteDataHandler={freeszeAllHandler}
      ></CheckModal>
    </motion.div>
  );
};

export default Home;