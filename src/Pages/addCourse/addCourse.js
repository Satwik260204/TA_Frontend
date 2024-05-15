import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import { useAuth } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import "./addCourse.css";
import { Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { Backdrop } from "@mui/material";
import { motion } from "framer-motion";

const AddCourse = () => {
 const [degreeData, setDegreeData] = useState("");
 const branchData = ["CE", "CSE", "EE", "ME"];
 const [courses, setCourses] = useState();
 const [courseCode, setCourseCode] = useState("");
 const [courseName, setCourseName] = useState("");
 const [taPos, setTaPos] = useState("");
 const [degree, setDegree] = useState("");
 const [branch, setBranch] = useState("");
 const [open, setOpen] = useState(false);
 const [deleteCourse, setDeleteCourse] = useState();
 const [delCourseCode, setDelCourseCode] = useState();
 const [crValue, setCrValue] = useState("");
 const temp = ["B-tech", "M-tech", "PHD"];
 const [btechData, setBtechData] = useState("");
 const [mtechData, setMtechData] = useState("");
 const [msData, setMsData] = useState("");
 const [mscData, setMscData] = useState("");
 const [phdData, setPhdData] = useState("");

 let BTech = [
 { value: "NOT ELIGIBLE", label: "NOT ELIGIBLE" },
 { value: "CE", label: "CE" },
 { value: "CSE", label: "CSE" },
 { value: "EE", label: "EE" },
 { value: "ME", label: "ME" },
 { value: "DSE", label: "DSE" },
 ];
 let MS = [
 { value: "NOT ELIGIBLE", label: "NOT ELIGIBLE" },
 { value: "CE", label: "CE" },
 { value: "CSE", label: "CSE" },
 { value: "EE", label: "EE" },
 { value: "ME", label: "ME" },
 { value: "DSE", label: "DSE" },
 { value: "ESSENCE", label: "ESSENCE" },
 ];
 let MTech = [
 { value: "NOT ELIGIBLE", label: "NOT ELIGIBLE" },
 { value: "CE", label: "CE" },
 { value: "CSE", label: "CSE" },
 { value: "EE", label: "EE" },
 { value: "ME", label: "ME" },
 { value: "DSE", label: "DSE" },
 { value: "SOCD", label: "SOCD" },
 ];
 let MSc = [
 { value: "NOT ELIGIBLE", label: "NOT ELIGIBLE" },
 { value: "CHEMISTRY", label: "CHEMISTRY" },
 { value: "PHYSICS", label: "PHYSICS" },
 { value: "MATHEMATICS", label: "MATHEMATICS" },
 ];
 let PhD = [
 { value: "NOT ELIGIBLE", label: "NOT ELIGIBLE" },
 { value: "CE", label: "CE" },
 { value: "CSE", label: "CSE" },
 { value: "EE", label: "EE" },
 { value: "ME", label: "ME" },
 { value: "DSE", label: "DSE" },
 { value: "CHEMISTRY", label: "CHEMISTRY" },
 { value: "PHYSICS", label: "PHYSICS" },
 { value: "MATHEMATICS", label: "MATHEMATICS" },
 { value: "ESSENCE", label: "ESSENCE" },
 { value: "HUMANITIES", label: "HUMANITIES" },
 { value: "BSE", label: "BSE" },
 ];

 const facEmail = JSON.parse(secureLocalStorage.getItem("user")).email;
 const facDepartment = secureLocalStorage.getItem("department");

 useEffect(() => {
 const handleDelCourse = async () => {
 let token = secureLocalStorage.getItem("token");
 const headers = {
 authorization: `${token}`,
 };
 //console.log("helloooo");
 try {
 const res4 = await axios.get("http://localhost:4000/selectcourses", {
 headers: headers,
 });
 //console.log(res4.data.data);
 let temp3 = [];
 for (let i of res4.data.data) {
 let t = {
 value: i.name,
 label: i.code,
 };
 temp3.push(t);
 }
 setDeleteCourse(temp3);
 } catch (e) {
 console.log(e.message);
 }
 };
 handleDelCourse();
 

 const handleCourseData = async () => {
 const body = {
 email: facEmail,
 };
 let token = secureLocalStorage.getItem("token");
 const headers = {
 authorization: `${token}`,
 };
 try {
 const response = await axios.post(
 "http://localhost:4000/faculty/courses",
 body,
 {
 headers: headers,
 }
 );

 //console.log("yyyyy");
 //console.log(response.data.data.courses);
 let courseData = [];
 for (let i of response.data.data.courses) {
 let temp = {
 value: i.code,
 label: i.name,
 };
 courseData.push(temp);
 }
 setCourses(courseData);
 } catch (e) {
 console.log(e.message);
 }
 };

 handleCourseData();
 }, []);

 let navigate = useNavigate();
 const courseNameHandler = (selectedOption) => {
 setCourseName(selectedOption.target.value);
 };
 const courseCodeHandler = (selectedOption) => {
 setCourseCode(selectedOption.target.value);
 };
 const taPosHandler = (selectedOption) => {
 setTaPos(selectedOption.target.value);
 };
 const btechHandler = (selectedOption) => {
 if(selectedOption.some(e => e.value == "NOT ELIGIBLE")){
 
 setBtechData([{value:"NOT ELIGIBLE",label:"NOT ELIGIBLE"}]);
 }
 else{
 setBtechData(selectedOption);
 }
 };
 const mtechHandler = (selectedOption) => {
 if(selectedOption.some(e => e.value == "NOT ELIGIBLE")){
 
 setMtechData([{value:"NOT ELIGIBLE",label:"NOT ELIGIBLE"}]);
 }
 else{
 setMtechData(selectedOption);
 }
 };
 const msHandler = (selectedOption) => {
 if(selectedOption.some(e => e.value == "NOT ELIGIBLE")){
 
 setMsData([{value:"NOT ELIGIBLE",label:"NOT ELIGIBLE"}]);
 }
 else{
 setMsData(selectedOption);
 }
 };
 const mscHandler = (selectedOption) => {
 if(selectedOption.some(e => e.value == "NOT ELIGIBLE")){
 
 setMscData([{value:"NOT ELIGIBLE",label:"NOT ELIGIBLE"}]);
 }
 else{
 setMscData(selectedOption);
 }
 };
 const phdHandler = (selectedOption) => {
 if(selectedOption.some(e => e.value == "NOT ELIGIBLE")){
 
 setPhdData([{value:"NOT ELIGIBLE",label:"NOT ELIGIBLE"}]);
 }
 else{
 setPhdData(selectedOption);
 }
 };
 const delCourseCodeHandler = (selectedOption) => {
 setDelCourseCode(selectedOption);
 };
 const courseHandler = (selectedOption) => {
 setCrValue(selectedOption);
 };

 const addCourseHandler = async (e) => {
 e.preventDefault();

 const body = {
 course_code: crValue.value,
 name: crValue.label,
 faculty: {
 email: facEmail,
 },
 number: taPos,
 btech: btechData,
 mtech: mtechData,
 ms: msData,
 msc: mscData,
 phd: phdData,
 };

 let token = secureLocalStorage.getItem("token");
 const headers = {
 authorization: `${token}`,
 };
 let res;
 setOpen(true);
 try {
 res = await axios.post("http://localhost:4000/addcourse", body, {
 headers: headers,
 });
 setBtechData("");
 setMsData("");
 setPhdData("");
 setMscData("");
 setMtechData("");
 setTaPos("");
 setCrValue("");
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
 };
 const deleteCourseHandler = async (e) => {
 e.preventDefault();
 const body = {
 delete_code: delCourseCode,
 };
 let token = secureLocalStorage.getItem("token");
 const headers = {
 authorization: `${token}`,
 };
 let res;
 setOpen(true);
 try {
 res = await axios.post("http://localhost:4000/delcourse", body, {
 headers: headers,
 });
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
 navigate("/");

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
 Course Details Form
 </Typography>
 <Typography variant="subtitle1" gutterBottom>
 Choose Course:
 </Typography>
 <Select
 options={courses}
 onChange={courseHandler}
 value={crValue}
 ></Select>
 <Typography variant="subtitle1" gutterBottom>
 No. of TA Positions:
 </Typography>
 <input
 className="text"
 aria-label="Demo number input"
 placeholder="Type a number…"
 type="number"
 onChange={taPosHandler}
 value={taPos}
 style={{ width: '84rem', border: '1px solid #CCCCCC'}} 
 />
 <Typography variant="subtitle1" gutterBottom>
 BTech Eligibility:
 </Typography>
 <Select
 className="option"
 isMulti
 options={BTech}
 onChange={btechHandler}
 value={btechData}
 ></Select>
 <Typography variant="subtitle1" gutterBottom>
 MTech Eligibility:
 </Typography>
 <Select
 className="option"
 isMulti
 options={MTech}
 onChange={mtechHandler}
 value={mtechData}
 ></Select>
 <Typography variant="subtitle1" gutterBottom>
 MS Eligibility:
 </Typography>
 <Select
 className="option"
 isMulti
 options={MS}
 onChange={msHandler}
 value={msData}
 ></Select>
 <Typography variant="subtitle1" gutterBottom>
 PhD Eligibility:
 </Typography>
 <Select
 className="option"
 isMulti
 options={PhD}
 onChange={phdHandler}
 value={phdData}
 ></Select>
 <Typography variant="subtitle1" gutterBottom>
 MSc Eligibility:
 </Typography>
 <Select
 className="option"
 isMulti
 options={MSc}
 onChange={mscHandler}
 value={mscData}
 ></Select>

 <Button
 variant="contained"
 onClick={addCourseHandler}
 sx={{ marginTop: 2, backgroundColor: "#3F51B5" }}
 >
 Submit
 </Button>
 <Typography variant="h4" gutterBottom>
 Delete Course
 </Typography>
 <Select
 isMulti
 options={deleteCourse}
 onChange={delCourseCodeHandler}
 value={delCourseCode}
 ></Select>
 <Button
 variant="contained"
 onClick={deleteCourseHandler}
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

export default AddCourse;