import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../Utils/auth";
import "./NavBar.css";
import { googleLogout } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { Backdrop, IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { LogOut } from "react-feather";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  var flag = secureLocalStorage.getItem("flag");

  const redirectPath = location.state?.path || "/";

  useEffect(() => {
    /* global google */
    // const client = google.accounts.oauth2.initTokenClient({
    //   client_id:
    //     "437720385016-4b6pgdkgbn55m8ifo7gif60lndkkehu2.apps.googleusercontent.com",
    //   scope: "https://www.googleapis.com/auth/calendar.readonly",
    //   callback: testHandler,
    // });
    // client.requestAccessToken();
    // google.accounts.id.initialize({
    //   client_id:
    //     "437720385016-4b6pgdkgbn55m8ifo7gif60lndkkehu2.apps.googleusercontent.com",
    // });
  }, []);

  const logInHandler = async (credentialResponse) => {
    setOpen(true);
    await auth.login(credentialResponse.credential);
    if (secureLocalStorage.getItem("isLoggedin")) {
      setOpen(false);
      navigate(redirectPath, {
        state: { user: `${auth.user}` },
        replace: true,
      });
    } else {
      setOpen(false);
    }
  };

  const logoutHandler = async () => {
    const token = secureLocalStorage.getItem("token");
    // console.log(token);
    google.accounts.oauth2.revoke(`${token}`, (done) => {
      console.log(done);
    });
    googleLogout();
    auth.logout();
    toast.success("Log out Succesfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };
  return (
    <nav>
      <ul className="navbar">
        <Button className="logo" sx={{ position: "absolute", left: "15px" }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "24px",
            }}
          >
            IIT PALAKKAD
          </Typography>
        </Button>

        {secureLocalStorage.getItem("isLoggedin") ? (
          <li className="navigation">
            <NavLink className="link" to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        {secureLocalStorage.getItem("isLoggedin") &&
        secureLocalStorage.getItem("role") === "super_admin" ? (
          <li className="navigation">
            <NavLink
              className="link"
              to="/phase"
              activeClassName="active"
            >
              Phase Control
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        {secureLocalStorage.getItem("isLoggedin") &&secureLocalStorage.getItem("role")==="student"? (
          <li className="navigation">
            <NavLink className="link" to="/applyta" activeClassName="active">
              Apply TA
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        {secureLocalStorage.getItem("isLoggedin") &&
        (secureLocalStorage.getItem("role") === "faculty" ||
          secureLocalStorage.getItem("role") === "admin") ? (
          <li className="navigation">
            <NavLink className="link" to="/addcourse" activeClassName="active">
              Add Course
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        {secureLocalStorage.getItem("isLoggedin") &&
        (secureLocalStorage.getItem("role") === "admin" ||
          secureLocalStorage.getItem("role") === "faculty") ? (
          <li className="navigation">
            <NavLink className="link" to="/addTA" activeClassName="active">
              Add Preferences
            </NavLink>
          </li>
        ) : (
          <></>
        )}

        {secureLocalStorage.getItem("isLoggedin") &&
        secureLocalStorage.getItem("role") === "super_admin" ? (
          <li className="navigation">
            <NavLink
              className="link"
              to="/assignAdmin"
              activeClassName="active"
            >
              Assign Admin
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        
        {secureLocalStorage.getItem("isLoggedin") &&
        secureLocalStorage.getItem("role") === "super_admin" ? (
          <li className="navigation">
            <NavLink className="link" to="/department" activeClassName="active">
              Add Departments
            </NavLink>
          </li>
        ) : (
          <></>
        )}


        {secureLocalStorage.getItem("isLoggedin") &&
        (secureLocalStorage.getItem("role") === "admin" ||
          secureLocalStorage.getItem("role") === "super_admin") ? (
          <li className="navigation">
            <NavLink className="link" to="/faculty" activeClassName="active">
              Add Faculty
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        {secureLocalStorage.getItem("isLoggedin") &&
        (secureLocalStorage.getItem("role") === "admin" ||
          secureLocalStorage.getItem("role") === "super_admin") ? (
          <li className="navigation">
            <NavLink className="link" to="/tools" activeClassName="active">
              Tools
            </NavLink>
          </li>
        ) : (
          <></>
        )}
        

        {!auth.user && (
          <li className="navigation">
            <GoogleLogin
              onSuccess={logInHandler}
              onError={() => {
                console.log("Login Failed");
              }}
              type="standard"
            />
            {/* <div id="signInDiv"></div> */}
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
                  colors={[
                    "#3F51B5",
                    "#3F51B5",
                    "#3F51B5",
                    "#3F51B5",
                    "#3F51B5",
                  ]}
                />
                <Typography variant="h4" sx={{ color: "#BFBFBF" }}>
                  Logging In...
                </Typography>
              </div>
            </Backdrop>
          </li>
        )}
        {auth.user && (
          // <IconButton
          //   sx={{ backgroundColor: "#C62828" , }}
          //   aria-label="delete"
          //   size="medium"
          //   onClick={logoutHandler}
          // >
          //   <LogOut />
          // </IconButton>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={logoutHandler}
          >
            LOG OUT
          </Button>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;