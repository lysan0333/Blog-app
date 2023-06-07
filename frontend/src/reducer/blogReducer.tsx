import { Action } from "@reduxjs/toolkit";
import {
  READ_BLOG,
  ADD_LIKE,
  ADD_BLOG,
  DELETE_BLOG,
  EDIT_BLOG,
  WATCH_BLOG,
  SORT_BLOGS,
} from "../action/constants";
const initialState = {
  blogs: [],
};

interface State {
  blogs: Array<any>;
}

interface Actiontype {
  type: string;
  payload: Object;
}

export default function Reducer(
  state: State = initialState,
  action: any
): State {
  let tmp = state.blogs;
  switch (action.type) {
    case READ_BLOG:
      return {
        ...state,
        blogs: action.payload,
      };
    case ADD_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case DELETE_BLOG:
      tmp.map((item, key) => {
        if (item._id === action.payload) {
          tmp.splice(key, 1);
        }
      });
      return {
        ...state,
        blogs: [...tmp],
      };
    case ADD_LIKE:
      tmp.map((item) => {
        if (item._id === action.payload) item.like++;
      });
      return {
        ...state,
        blogs: [...tmp],
      };
    case WATCH_BLOG:
      tmp.map((item) => {
        if (item._id === action.payload) item.watch++;
      });
      return {
        ...state,
        blogs: [...tmp],
      };
    case EDIT_BLOG:
      tmp.map((item) => {
        if (item._id === action.payload._id) {
          item.title = action.payload.title;
          item.content = action.payload.content;
          item.image = action.payload.image;
        }
      });
      return {
        ...state,
        blogs: [...tmp],
      };
    case SORT_BLOGS:
      return {
        ...state,
        blogs: [...tmp],
      };
    default:
      return state;
  }
}
