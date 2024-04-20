import React from "react";
import { useAuth } from "./auth";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children, role }) => {
  const auth = useAuth();
  const location = useLocation();

  const roles = role.split(",");

  if (!secureLocalStorage.getItem("isLoggedin") && !auth.user) {
    // console.log(location.pathname);
    if (location.pathname === "/assignAdmin") {
      return <Navigate to="/login" state={{ path: "/" }}></Navigate>;
    }
    return (
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    );
  }

  if (!roles.includes(secureLocalStorage.getItem("role"))) {
    return (
      <Navigate to="/error" state={{ path: location.pathname }}></Navigate>
    );
  }

  return children;
};