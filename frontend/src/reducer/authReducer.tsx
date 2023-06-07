import { Action } from "@reduxjs/toolkit";
import { SET_CURRENT_USER } from "../action/constants";
import { TypeTokenData, Actiontype } from "../action/actionType";
import { AnyAction } from "@reduxjs/toolkit";

interface State {
  isauth: boolean;
  user: TypeTokenData;
}
const initialState: State = {
  isauth: false,
  user: {
    name: "",
    id: "",
    exp: 0,
    iat: 0,
  },
};

export default function Reducer(
  state: State = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isauth: action.payload.name!='',
        user:action.payload
      };
    default:
      return state;
  }
}
