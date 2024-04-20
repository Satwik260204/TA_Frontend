import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { Typography, Button, Backdrop } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import "./AssignAdmin.css";
import { motion } from "framer-motion";

const AssignAdmin = () => {
  const [facultiesList, setFacultiesList] = useState();
  const [allFaclties, setAllFaclties] = useState();
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
        const res = await axios.get("http://localhost:4000/faculties", {
          headers: headers,
        });

        // console.log(res.data.data);
        const data = [];
        for (let i of res.data.data) {
          let temp = {
            value: `${i.name}` + `(${i.email})`,
            label: `${i.name}` + `(${i.email})`,
            department: `${i.department}`,
          };
          if (!i.isAdmin) {
            data.push(temp);
          }
        }
        setAllFaclties(data);
        setFacultiesList(data);
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

  const assignAdminHandler = (selectedOption) => {
    // console.log("Students", selectedOption);
    setAdminValue(selectedOption);
    setSelectedAdmin(selectedOption);
  };

  const assignDepartmentHandler = (selectedOption) => {
    setDepartmentvalue(selectedOption);
    setSelectedDepartment(selectedOption);
    let data = allFaclties;
    let data1;
    // console.log(facultiesList);
    // console.log(selectedOption);
    data1 = data.filter((item) => item.department === selectedOption.value);
    // console.log(data);
    setFacultiesList(data1);
  };

  const assignSelectedAdminHandler = async (e) => {
    e.preventDefault();

    const body = {
      faculty: selectedAdmin,
    };

    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };

    try {
      setOpen(true);
      const res = await axios.post("http://localhost:4000/assignAdmin", body, {
        headers: headers,
      });

      console.log(res);

      setAllFaclties(res.data.result.data);
      setAdminValue("");
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
      className="assignAdmin__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* <h2>Assign Admin</h2> */}
      <p className="assignAdmin__instruction">
        <div className="faculty__instruction">
          <b> Welcome</b> to the Assign Admin page of the TA Allocation Portal!
          <p>
            To assign admins to the system, you will need to select admins from
            the <b>dropdown</b> options available for <b>each department</b>.
            The assigned admins will have <b>administrative</b> privileges for
            their respective departments.
          </p>
          <p>
            Here are the steps to follow to assign Admins:
            <ul className="AddAdmin">
              <li>
                Select the desired department from the dropdown list for which
                you want to assign admin
              </li>

              <li>
                Once you have selected the department, you will see another
                dropdown option below it. Click on this dropdown and select the
                admin from the available options for the selected department.
              </li>

              <li>
                After selecting the admin, click on the "<b>Assign Admin</b>"
                button to assign the admin to the selected department.
              </li>
            </ul>
          </p>
        </div>
      </p>
      <div className="ta__form">
        <Typography variant="subtitle1" gutterBottom>
          Choose Department:
        </Typography>
        <Select
          options={departmentList}
          onChange={assignDepartmentHandler}
          value={departmentvalue}
        ></Select>
        <Typography variant="subtitle1" gutterBottom>
          Choose Faculty:
        </Typography>
        <Select
          isMulti
          options={facultiesList}
          onChange={assignAdminHandler}
          value={adminvalue}
        ></Select>
        <Button
          variant="contained"
          onClick={assignSelectedAdminHandler}
          sx={{ marginTop: 1, backgroundColor: "#3F51B5", width: "87.6px" }}
          size="medium"
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

export default AssignAdmin;
