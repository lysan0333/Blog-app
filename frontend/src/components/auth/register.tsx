import React from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../action/constants";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
const Register = () => {
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const navigate = useNavigate();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserdata({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onsubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (userData.password === userData.repassword) {
      axios
        .post(`${BASE_URL}/api/users/register`, userData)
        .then((res) => {
          alert("successfully registered!");
          navigate("/login");
        })
        .catch((err) => {});
    } else {
      alert("password is incorrect");
    }
  };

  return (
    <>
     <div className="w-1/4 m-auto mt-10 ">
      <form onSubmit={onsubmit} className="shadow borderpt-3">  
      <h2 className="mt-5 pt-2 pe-4 ps-9 text-center text-2xl font-bold leading-9 tracking-tight text-blue-900">Sign Up to your account</h2>
      <div className=" m-6">
         <label htmlFor="name"> Name </label> 
            <TextField
             className="w-full"
              name="name"
              type="text"
              id="outlined-basic"
              label="Name:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className=" m-6">
          <label htmlFor="email"> Email </label> 
            <TextField
             className="w-full"
              name="email"
              id="outlined-basic"
              label="Email:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className=" m-6">
          <label htmlFor="email"> Password </label> 
            <TextField
              className="w-full"
              name="password"
              type="password"
              id="outlined-basic"
              label="Password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <div className=" m-6">
          <label htmlFor="email"> Confirom Password </label> 
            <TextField
              className="w-full"
              name="repassword"
              type="password"
              id="outlined-basic"
              label="Re-password:"
              variant="outlined"
              onChange={onchange}
            />
          </div>
          <p className="mt-10 text-center text-sm text-gray-500 ps-6 pe-3">
          Not a member?
         <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
         </p>
          <button type="submit" className="w-full  flex justify-center  my-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
           Sign Up
          </button>
      </form>
    </div>

    </>
  );
};

export default Register;
