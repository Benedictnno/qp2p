import { configureStore } from "@reduxjs/toolkit";
import {reducers} from "./thunks/auth";
import userBalancesReducer from "./thunks/balance";
export const store = configureStore({
  reducer: {
    login:reducers.loginUser,           
    registerUser:reducers.registerUser,           
    userBalances: userBalancesReducer,           
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;