import React, { useEffect, useState } from "react";
import axios from "../auth/Axios";
import { InstagramLogo } from "../assets";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    await axios
      .post(`login`, { email, password })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex flex-col justify-center w-screen h-screen items-center space-y-6 bg-[rgba(250,250,250)]">
      <div className="w-[30%] flex flex-col space-y-6 bg-[#fff] p-8 border-[1px] border-slate-300">
        <div className="flex flex-col space-y-6 bg-white border-slate-300">
          <img src={InstagramLogo} className="w-[150px] mx-auto" />
          <div className="flex flex-col space-y-2">
            <input
              value={email}
              className="p-2 outline-slate-300 bg-slate-50 border-[1px] rounded-md border-slate-200 text-slate-400"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Phone number, email, or email"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-2 outline-slate-300 bg-slate-50 border-[1px] rounded-md border-slate-200 text-slate-400"
              type="password"
              placeholder="Password"
            />
            <button
              onClick={login}
              className={`${
                email.length !== 0 && password.length !== 0
                  ? "bg-link"
                  : "bg-disabled-link"
              } text-slate-50 py-2 w-full font-bold`}
            >
              Log In
            </button>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-[1px] bg-slate-400 w-1/3"></div>
            <h4 className="font-bold text-slate-400 text-center">OR</h4>
            <div className="h-[1px] bg-slate-400 w-1/3"></div>
          </div>
          <h4 className="text-[#4267b2] font-bold text-center">
            Log in with Facebook
          </h4>
          <small className="text-[#4267b2] text-center">Forgot password?</small>
        </div>
      </div>
      <div className="w-[30%] flex items-center justify-center bg-[#fff] p-8 border-[1px] border-slate-300">
        <h4>
          Don't have an account?{" "}
          <span className="text-link font-bold">Sign up</span>
        </h4>
      </div>
    </div>
  );
}

export default Login;
