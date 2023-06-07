import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../reducer/authReducer";
import blogReducer from "../reducer/blogReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
