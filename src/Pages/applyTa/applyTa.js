import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import { useAuth } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import "./applyTa.css";
import { Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { Backdrop } from "@mui/material";
import { motion } from "framer-motion";
var courseData = [];
const ApplyTA = () => {
  
  let navigate = useNavigate();
  const [pref1, setPref1] = useState("");
  const [pref2, setPref2] = useState("");
  const [pref3, setPref3] = useState("");
  const [pref4, setPref4] = useState("");
  const [pref5, setPref5] = useState("");
  const [courses, setCourses] = useState("");
  const [open, setOpen] = useState(false);
  
  const stdEmail = JSON.parse(secureLocalStorage.getItem("user")).email;

  useEffect(() => {
    const handleCourseData = async () => {
      let token = secureLocalStorage.getItem("token");
      const headers = {
        authorization: `${token}`,
      };
      try {
        const res = await axios.get("http://localhost:4000/applicantcourses", {
          headers: headers,
        });
        //console.log("hello");
        //console.log(res.data.data);
        courseData=[];
        for (let i of res.data.data) {
          //console.log(i);
          let temp = {
            value: i.code,
            label: i.name,
          };
          courseData.push(temp);

        }
        
        //console.log(pref1);
        setCourses(courseData);
        console.log(courses);
      } catch (e) {
        console.log(e.message);
      }
    };
    handleCourseData();
  }, []);
  const addPrefHandler= async (e)=>{
    e.preventDefault();

    const body = {
      pref1: pref1,
      pref2:pref2,
      pref3:pref3,
      pref4:pref4,
      pref5:pref5,
      student: {
        email:stdEmail,
      },
    };
    console.log(body);

    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    let res;
    setOpen(true);
    try {
      res = await axios.post("http://localhost:4000/applyta", body, {
        headers: headers,
      });
      setCourses("");
      setPref1("");
      setPref2("");
      setPref3("");
      setPref4("");
      setPref5("");
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
      navigate(`/`);


      // console.log(res.data.result.data);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
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
  }
  

  const handler1=(selectedOption)=>{
    setPref1(selectedOption);
    setCourses(prevCourses => courseData.filter(course => course !== selectedOption && course!==pref5 && course!==pref2 && course!==pref3 && course!==pref4));
  };
  const handler2=(selectedOption)=>{
    setPref2(selectedOption);
    setCourses(prevCourses => courseData.filter(course => course !== selectedOption && course!==pref1 && course!==pref5 && course!==pref3 && course!==pref4));
  };
  const handler5=(selectedOption)=>{
    setPref5(selectedOption);
    setCourses(prevCourses => courseData.filter(course => course !== selectedOption && course!==pref1 && course!==pref2 && course!==pref3 && course!==pref4));
  };
  const handler3=(selectedOption)=>{
    setPref3(selectedOption);
    setCourses(prevCourses => courseData.filter(course => course !== selectedOption && course!==pref1 && course!==pref2 && course!==pref5 && course!==pref4));
  };
  const handler4=(selectedOption)=>{
    setPref4(selectedOption);
    setCourses(prevCourses => courseData.filter(course => course !== selectedOption && course!==pref1 && course!==pref2 && course!==pref3 && course!==pref5));
  };

  return(
    <motion.div
      className="ta__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="ta-form">
        <Typography variant="h4" gutterBottom>
          Add Preferences
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Preference No. 1:
        </Typography>
        <Select
          className="option"
          options={courses}
          onChange={handler1}
          value={pref1}
        ></Select>
        <Typography variant="subtitle1" gutterBottom>
          Preference No. 2:
        </Typography>
        <Select
          className="option"
          options={courses}
          onChange={handler2}
          value={pref2}
        ></Select>
        <Typography variant="subtitle1" gutterBottom>
          Preference No. 3:
        </Typography>
        <Select
          className="option"
          options={courses}
          onChange={handler3}
          value={pref3}
        ></Select>
        <Typography variant="subtitle1" gutterBottom>
          Preference No. 4:
        </Typography>
        <Select
          className="option"
          options={courses}
          onChange={handler4}
          value={pref4}
        ></Select>
        <Typography variant="subtitle1" gutterBottom>
          Preference No. 5:
        </Typography>
        <Select
          className="option"
          options={courses}
          onChange={handler5}
          value={pref5}
        ></Select>
        <Button
          variant="contained"
          onClick={addPrefHandler}
          sx={{ marginTop: 2, backgroundColor: "#3F51B5" }}
        >
          Submit
        </Button>
      </div>
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
    </motion.div>
  );
};

export default ApplyTA;