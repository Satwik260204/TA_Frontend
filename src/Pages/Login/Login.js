import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./LogIn.css";
import Bg from "./Components/Bg";
import { motion } from "framer-motion";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/auth";
import secureLocalStorage from "react-secure-storage";

function Login(props) {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  return (
    <motion.div
      className="logIn"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <Bg></Bg>
    </motion.div>
  );
}

export default Login;
