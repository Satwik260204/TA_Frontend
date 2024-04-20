import { useState, useEffect, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { toast } from "react-toastify";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [islogin, setIsLogin] = useState(false);
  const [id, setId] = useState(null);
  const [department, setDepartment] = useState(null);
  const [freeze, setFreeze] = useState(false);

  useEffect(() => {
    const ur = secureLocalStorage.getItem("user");
    const rl = secureLocalStorage.getItem("role");
    const lg = secureLocalStorage.getItem("isLoggedin");
    const fl=  secureLocalStorage.getItem("flag");
    setUser(ur);
    setRole(rl);
    setIsLogin(lg);
  }, []);

  const login = async (creds) => {
    // const user = jwt_decode(creds);
    // console.log(creds);
    let res;
    try {
      const body = {
        userDetails: creds,
      };

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      res = await axios.post("http://localhost:4000/user_check", body, {
        headers: headers,
      });
      // console.log(res);
      if (res.data.statusCode === 200 && res.data.result.registered === true) {
        secureLocalStorage.setItem(
          "user",
          JSON.stringify(res.data.result.user_details)
        );
        secureLocalStorage.setItem("flag",res.data.result.flag);
        secureLocalStorage.setItem("token", res.data.result.token);
        secureLocalStorage.setItem("department", res.data.result.department);
        secureLocalStorage.setItem("isLoggedin", true);
        secureLocalStorage.setItem("role", res.data.result.position);
        secureLocalStorage.setItem("id", res.data.result.user_details.sub);
        secureLocalStorage.setItem("role", res.data.result.position);
        secureLocalStorage.setItem("freeze", res.data.result.freeze);
        secureLocalStorage.setItem("ph1",res.data.result.ph1);
        // console.log("user");
        // console.log(secureLocalStorage.getItem("ph1"));
        secureLocalStorage.setItem("ph2",res.data.result.ph2);
        secureLocalStorage.setItem("ph3",res.data.result.ph3);
        // console.log(creds);
        setUser(res.data.result.user_details);
        setToken(res.data.result.token);
        setDepartment(res.data.result.department);
        setFreeze(res.data.result.freeze);
        toast.success("Log in Succesfully", {
          position: "top-center",
          autoClose: 200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        secureLocalStorage.setItem("isLoggedin", false);
        toast.error(`${res.data.message}`, {
          position: "top-center",
          autoClose: 200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, {
        position: "top-center",
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const logout = () => {
    secureLocalStorage.clear();
    secureLocalStorage.setItem("isLoggedin", false);
    secureLocalStorage.setItem("role", null);
    secureLocalStorage.setItem("freeze", false);
    setUser(null);
    setToken(null);
    setFreeze(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        role,
        islogin,
        id,
        department,
        freeze,
        setFreeze,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};