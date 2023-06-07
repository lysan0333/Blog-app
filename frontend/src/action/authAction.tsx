import axios from "axios";
import { SET_CURRENT_USER, BASE_URL } from "./constants";
import jwtDecode from "jwt-decode";
import { AppDispatch } from "../app/store";
import { TypeRegisterData, TypeLoginData, TypeTokenData } from "./actionType";

export const registerUser =
  (userdata: TypeRegisterData, navigate: any) => (dispatch: AppDispatch) => {
    axios
      .post(`${BASE_URL}/api/users/register`, userdata)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const loginUser =
  (userdata: TypeLoginData, navigate: any) => (dispatch: AppDispatch) => {
    axios
      .post(`${BASE_URL}/api/users/login`, userdata)
      .then((res) => {
        localStorage.setItem("token", res.data);
        const decoded: TypeTokenData = jwtDecode(res.data);
        dispatch(setCurrntUser(decoded));
        navigate("/");
      })
      .catch((err) => {});
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  dispatch(setCurrntUser({ name: "", id: "", exp: 0, iat: 0 }));
};

export const setCurrntUser = (decoded: TypeTokenData) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
