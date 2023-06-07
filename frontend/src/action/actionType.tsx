import { AnyAction } from "@reduxjs/toolkit";

export type TypeRegisterData = {
  name: string;
  email: string;
  password: string;
  repassword: string;
};
export type TypeLoginData = {
  email: string;
  password: string;
};
export type TypeTokenData = {
  name: string;
  id: string;
  exp: Number;
  iat: Number;
};
export type Actiontype = {
  type: string;
  payload: {
    payload: TypeTokenData;
  };
};

export type TypeBlog = {
  _id: string;
  title: string;
  content: string;
  watch: number;
  like: number;
  user_name: string;
  image: string;
};
