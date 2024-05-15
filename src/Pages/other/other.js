import React, { useEffect, useState } from "react";
import Select from "react-select";

import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { Typography, Button } from "@mui/material";

import "./other.css";

import { motion } from "framer-motion";

import { toast } from "react-toastify";


const Other = () => {
  const [stdData, setStdData] = useState("");
  const [stdValue, setStdValue] = useState("");
  const [departmentList, setDepartmentList] = useState();
  const [departmentvalue, setDepartmentvalue] = useState("");
  const [open, setOpen] = useState(false);
  const [bmin,setBmin]=useState();
  const [bmax,setBmax]=useState();
  const [mtechmin,setMTmin]=useState();
  const [mtechmax,setMTmax]=useState();
  const [msmax,setMSmax]=useState();
  const [mscmax,setMSCmax]=useState();
  const [msmin,setMSmin]=useState();
  const [mscmin,setMSCmin]=useState();
  const [phdmin,setPHDmin]=useState();
  const [phdmax,setPHDmax]=useState();

  useEffect(() => {
    const handleData = async () => {
      let token = secureLocalStorage.getItem("token");
      const headers = {
        authorization: `${token}`,
      };
      try {
        const res = await axios.get("http://localhost:4000/students", {
          headers: headers,
        });

        // console.log(res.data.data);
        const data = [];
        for (let i of res.data.data) {
          let temp = {
            value: i.rollNumber,
            label: `${i.name}` + `(${i.rollNumber})`,
          };

          data.push(temp);
        }
        setStdData(data);
      } catch (e) {
        console.log(e);
      }
      try {
        const res = await axios.get("http://localhost:4000/alldepartments", {
          headers: headers,
        });

        // console.log(res.data.data);
        const data = [];
        for (let i of res.data.data) {
          let temp = {
            value: `${i.name}`,
            label: `${i.name}`,
          };

          data.push(temp);
        }

        setDepartmentList(data);
      } catch (e) {
        console.log(e);
      }
    };
    handleData();
  }, []);
  // YEARS START
  const bminHandler = async (e) => {
    setBmin(e.target.value);
  };
  const bmaxHandler = async (e) => {
    setBmax(e.target.value);
  };

  const mtminHandler = async (e) => {
    setMTmin(e.target.value);
  };
  const mtmaxHandler = async (e) => {
    setMTmax(e.target.value);
  };

  const msminHandler = async (e) => {
    setMSmin(e.target.value);
  };
  const msmaxHandler = async (e) => {
    setMSmax(e.target.value);
  };

  const mscminHandler = async (e) => {
    setMSCmin(e.target.value);
  };
  const mscmaxHandler = async (e) => {
    setMSCmax(e.target.value);
  };

  const phdminHandler = async (e) => {
    setPHDmin(e.target.value);
  };
  const phdmaxHandler = async (e) => {
    setPHDmax(e.target.value);
  };
  const yearSubmitHandler = async(e)=>{
    e.preventDefault();

    const body={
      bmin:bmin,
      bmax:bmax,
      mtechmin:mtechmin,
      mtechmax:mtechmax,
      msmin:msmin,
      msmax:msmax,
      mscmin:mscmin,
      mscmax:mscmax,
      phdmin:phdmin,
      phdmax:phdmax,
    }
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    try {
      setOpen(true);
      const res = await axios.post("http://localhost:4000/timeline", body, {
        headers: headers,
      });

      console.log(res);

      // setAllFaclties(res.data.result.data);

      setDepartmentvalue("");
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

      setBmin("");
      setMTmax("");
      setMTmin("");
      setBmax("");
      setMSCmax("");
      setMSCmin("");
      setMSmax("");
      setMSmin("");
      setPHDmax("");
      setPHDmin("");

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
  // YEARS END

  const handler = async (selectedOption) => {
    setStdValue(selectedOption);
  };
  const assignDepartmentHandler = (selectedOption) => {
    setDepartmentvalue(selectedOption);
    //setSelectedDepartment(selectedOption);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      student: stdValue,
      department: departmentvalue,
    };

    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };

    try {
      setOpen(true);
      const res = await axios.post("http://localhost:4000/tool", body, {
        headers: headers,
      });

      console.log(res);

      // setAllFaclties(res.data.result.data);

      setDepartmentvalue("");
      setStdValue("");
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
  };
  return (
    <motion.div
      className="ta__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="ta-form">
        <Typography variant="h4" gutterBottom>
          Mention year limit
        </Typography>

        <Typography variant="h5" gutterBottom>
          BTech
        </Typography>
        <div class="container">
          <div class="one">
            <p>Minimum:</p>
          </div>
          <div class="one">
            <input type="number" name="price" min="1" max="10" step="0.5" onChange={bminHandler} value={bmin}/>
          </div>
          <div class="one">
            <p>Maximum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={bmaxHandler} value={bmax}/>
          </div>
        </div>
        {/* <hr></hr> */}
        <Typography variant="h5" gutterBottom>
          MTech
        </Typography>
        <div class="container">
          <div class="one">
            <p>Minimum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={mtminHandler} value={mtechmin}/>
          </div>
          <div class="one">
            <p>Maximum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={mtmaxHandler} value={mtechmax}/>
          </div>
        </div>

        <Typography variant="h5" gutterBottom>
          MS
        </Typography>
        <div class="container">
          <div class="one">
            <p>Minimum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={msminHandler} value={msmin}/>
          </div>
          <div class="one">
            <p>Maximum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={msmaxHandler} value={msmax}/>
          </div>
        </div>

        <Typography variant="h5" gutterBottom>
          MSc
        </Typography>
        <div class="container">
          <div class="one">
            <p>Minimum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={mscminHandler} value={mscmin}/>
          </div>
          <div class="one">
            <p>Maximum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={mscmaxHandler} value={mscmax}/>
          </div>
        </div>

        <Typography variant="h5" gutterBottom>
          Phd
        </Typography>
        <div class="container">
          <div class="one">
            <p>Minimum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={phdminHandler} value={phdmin}/>
          </div>
          <div class="one">
            <p>Maximum:</p>
          </div>
          <div class="one">
          <input type="number" name="price" min="1" max="10" step="0.5" onChange={phdmaxHandler} value={phdmax}/>
          </div>
        </div>
        <Button
          variant="contained"
          onClick={yearSubmitHandler}
          sx={{

            marginBottom: 2,
            backgroundColor: "#3F51B5",
            width: "90px",
          }}
          size="large"
        >
          Submit
        </Button>

        <div>
      
        <Typography variant="h4" gutterBottom paddingTop={2}>
          Assign a department to student
        </Typography>
        <Typography variant="h6" gutterBottom>
          Select a Student
        </Typography>

        <Select options={stdData} onChange={handler} value={stdValue}></Select>

        <Typography variant="h6" gutterBottom>
          Select a Department
        </Typography>
        <Select
          options={departmentList}
          onChange={assignDepartmentHandler}
          value={departmentvalue}
        ></Select>
        </div>

        <Button
          variant="contained"
          onClick={submitHandler}
          sx={{
            marginTop: 3,
            marginBottom: 2,
            backgroundColor: "#3F51B5",
            width: "90px",
          }}
          size="large"
        >
          Submit
        </Button>
      </div>
    </motion.div>
  );
};

export default Other;