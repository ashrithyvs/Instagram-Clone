import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Auth/Axios";
import unAuthAxios from "../Auth/UnAuthAxios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

const useAuth = () => {
  let navigate = useNavigate();
  const [error, setError] = useState(null);

  //set user
  const setUserContext = (newUser) => {
    navigate("/");
    window.location.reload();
  };

  const saveUserToken = (token) => {
    localStorage.setItem("accessToken", token);
  };

  const saveRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
  };

  const login = (email, password) => {
    return unAuthAxios
      .post("login", {
        email: email,
        password: password,
      })
      .then(async (data) => {
        console.log("success", data);
        saveUserToken(data.data?.token);
        saveRefreshToken(data.data?.refresh_token);
        setUserContext(data.data?.first_name);
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log("fail", err);
        setError(err.response?.data);
        toast.error("Incorrect Username or Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const loginWithGoogle = (response) => {
    return unAuthAxios
      .post("user/google", {
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        email: response.profileObj.email,
        google_id: response.profileObj.googleId,
      })
      .then(async (data) => {
        console.log("success", data);
        saveUserToken(data.data.token);
        saveRefreshToken(data.data.refresh_token);
        setUserContext(data.data.first_name);
      })
      .catch((err) => {
        console.log("fail", err);
        setError(err);
        toast.error("Failed to Login using google", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const logout = (scb, fcb) => {
    return axios
      .post("user/logout", {
        refresh_token: localStorage.getItem("refreshToken"),
      })
      .then((data) => {
        console.log("success", data);
        localStorage.clear();
        scb();
      })
      .catch((err) => {
        console.log("fail", err);
        fcb();
        toast.error("Failed to logout", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return {
    error,
    login,
    loginWithGoogle,
    logout,
  };
};

export default useAuth;
