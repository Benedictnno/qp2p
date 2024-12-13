import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from "./thunks/auth";
export const store = configureStore({
  reducer: {
    login: loginUserReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;