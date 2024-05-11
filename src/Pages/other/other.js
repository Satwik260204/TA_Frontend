import React, { useEffect, useState } from "react";
import Select from "react-select";
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

import UnassignedStdTable from "../../Components/UnassignedStdTable";
import { motion } from "framer-motion";
import CheckModal from "../../Components/CheckModal";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import PhaseControl from "../phaseControl/phase";



const Other =( )=>{

    const [stdData,setStdData]= useState("");
    const [stdValue,setStdValue]= useState("");
    const [departmentList, setDepartmentList] = useState();
    const [departmentvalue, setDepartmentvalue] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [adminvalue, setAdminValue] = useState("");
    const [selectedAdmin, setSelectedAdmin] = useState();
    const [open, setOpen] = useState(false);
    

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
      const handler= async (selectedOption)=>{

        setStdValue(selectedOption);

      }
      const assignDepartmentHandler = (selectedOption) => {
        setDepartmentvalue(selectedOption);
        setSelectedDepartment(selectedOption);
      };
      const submitHandler = async (e) => {
        e.preventDefault();
    
        const body = {
          student: stdValue,
          department:departmentvalue,
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
            Select a Student to Add Additional Department
          </Typography> 

          <Select
          options={stdData}
          onChange={handler}
          value={stdValue}

        ></Select>     

        <Typography variant="h4" gutterBottom>
            Select a Department
          </Typography> 
          <Select
          options={departmentList}
          onChange={assignDepartmentHandler}
          value={departmentvalue}

        ></Select>    

        <Button
          variant="contained"
          onClick={submitHandler}
          sx={{ marginTop: 1, backgroundColor: "#3F51B5", width: "87.6px" }}
          size="medium"
        >
          Submit
        </Button>
        
      </div>

    </motion.div>
  );
}

export default Other;