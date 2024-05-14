import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { AuthProvider } from "./Utils/auth";
import { RequireAuth } from "./Utils/RequireAuth";
import NavBar from "./Components/NavBar";
import FacultyInfo from "./Pages/addFaculty/FacultyInfo";
import secureLocalStorage from "react-secure-storage";
import StudentInfo from "./Pages/addStudent/StudentInfo";
import AllocateTA from "./Pages/AllocateTA/AllocateTA";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignAdmin from "./Pages/AssignAdmin/AssignAdmin";
import { Error } from "./Components/Error";
import DepartmentInfo from "./Pages/addDepartment/DepartmentInfo";
import { AnimatePresence, useScroll } from "framer-motion";
import AddCourse from "./Pages/addCourse/addCourse";
import AddDg from "./Pages/addDgDp/addDg";
import StudentHome from "./Pages/Home/StudentHome";
import ApplyTA  from "./Pages/applyTa/applyTa";
import PhaseControl from "./Pages/phaseControl/phase";
import { useEffect, useState } from "react";
import Other from "./Pages/other/other";
function App() {
  const location = useLocation();
  const role= secureLocalStorage.getItem("role");
  const [phase1,setPh1]=useState();
  const [phase2,setPh2]=useState();
  const [phase3,setPh3]=useState();
  useEffect(()=>{
    setPh1(secureLocalStorage.getItem("ph1"));
    setPh2(secureLocalStorage.getItem("ph2"));
    setPh3(secureLocalStorage.getItem("ph3"));
    // console.log(secureLocalStorage.getItem("ph1"));
  })

  return (
    <AuthProvider>
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login></Login>}></Route>
           {/* {secureLocalStorage.getItem("flag") && <Route
              element={
                <RequireAuth role="student">
                  <AddDg></AddDg>
                </RequireAuth>
              }
              path="/"
            />} */}
            
          {role==="student"&&<Route
            element={
              <RequireAuth role="student">
                <StudentHome></StudentHome>
              </RequireAuth>
            }
            path="/"
          />}
          {role!=="student"&&<Route
            element={
              <RequireAuth role="admin,super_admin,faculty,readOnly">
                <Home></Home>
              </RequireAuth>
            }
            path="/"
          />}
          {phase2 && <Route
            element={
              <RequireAuth role="student">
                <ApplyTA></ApplyTA>
              </RequireAuth>
            }
            path="/applyta"
          />}
          {!phase2 && <Route
            element={
              <RequireAuth role="student">
                <h3>This phase is not active</h3>
              </RequireAuth>
            }
            path="/applyta"
          />}
          <Route
            element={
              <RequireAuth role="admin,super_admin">
                <StudentInfo></StudentInfo>
              </RequireAuth>
            }
            path="/student"
          />
          <Route
            element={
              <RequireAuth role="super_admin">
                <AssignAdmin></AssignAdmin>
              </RequireAuth>
            }
            path="/assignAdmin"
          />
          <Route
            element={
              <RequireAuth role="super_admin">
                <Other></Other>
              </RequireAuth>
            }
            path="/tools"
          />
          <Route
            element={
              <RequireAuth role="admin,super_admin">
                <FacultyInfo></FacultyInfo>
              </RequireAuth>
            }
            path="/faculty"
          />
          <Route
            element={
              <RequireAuth role="super_admin">
                <DepartmentInfo></DepartmentInfo>
              </RequireAuth>
            }
            path="/department"
          />
          {phase3 && <Route
            element={
              <RequireAuth role="admin,faculty">
                <AllocateTA></AllocateTA>
              </RequireAuth>
            }
            path="/addTA"
          />}
          {!phase3 && <Route
            element={
              <RequireAuth role="admin,faculty">
                <h3>This phase is not active</h3>
              </RequireAuth>
            }
            path="/addTA"
          />}
          {phase1 &&<Route
            element={
              <RequireAuth role="admin,faculty">
                <AddCourse></AddCourse>
              </RequireAuth>
            }
            path="/addcourse"
          />}
          {!phase1 &&<Route
            element={
              <RequireAuth role="admin,faculty">
                <h3>This phase is not active</h3>
              </RequireAuth>
            }
            path="/addcourse"
          />}
          <Route
            element={
              <RequireAuth role="super_admin">
                <PhaseControl></PhaseControl>
              </RequireAuth>
            }
            path="/phase"
            />
          

          <Route element={<Error></Error>} path="/error" />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;