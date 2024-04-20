import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import { useAuth } from "../../Utils/auth";
import { Route, useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import { Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { Backdrop } from "@mui/material";
import { motion } from "framer-motion";
import "./addDg.css";
import { Flag } from "react-feather";
import { Link, NavLink } from "react-router-dom";
function AddDg(props) {
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [open, setOpen] = useState(false);
  const stdEmail = JSON.parse(secureLocalStorage.getItem("user")).email;
  let temp1 = [
    { value: "B-tech", label: "B-tech" },
    { value: "M-tech", label: "M-tech" },
    { value: "PHD", label: "PHD" },
  ];
  let temp2 = [
    { value: "CE", label: "CE" },
    { value: "CSE", label: "CSE" },
    { value: "EE", label: "EE" },
    { value: "ME", label: "ME" },
  ];
  const submitHandler = async (e) => {
    e.preventDefault();

    const body = {
      email: stdEmail,
      deg: degree,
      bra: branch,
    };
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    setOpen(true);
    let res;
    try {
      res = await axios.post("http://localhost:4000/addDgDp", body, {
        headers: headers,
      });
      // console.log("BYE");
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
      secureLocalStorage.setItem("flag", false);
      navigate(`/`);

      // console.log(res.data.result.data);
      // window.location.reload();
    } catch (e) {
      console.log(e);
    }
    setOpen(false);
  };
  let navigate = useNavigate();
  const routeChange = () => {};
  const degreeHandler = (selectedOption) => {
    setDegree(selectedOption);
  };
  const branchHandler = (selectedOption) => {
    setBranch(selectedOption);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form onSubmit={submitHandler}>
          <label>
            Degree:
            <Select
              className="input"
              options={temp1}
              onChange={degreeHandler}
              value={degree}
            ></Select>
          </label>
          <label>
            Department:
            <Select
              className="input"
              options={temp2}
              onChange={branchHandler}
              value={branch}
            ></Select>
          </label>

          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDg;