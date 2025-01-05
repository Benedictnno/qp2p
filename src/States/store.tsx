import { configureStore } from "@reduxjs/toolkit";
import {reducers} from "./thunks/auth";
import userBalancesReducer from "./thunks/balance";
import profileDetailsReducer from "./thunks/profileDetails";
export const store = configureStore({
  reducer: {
    login: reducers.loginUser,
    registerUser: reducers.registerUser,
    profileDetails: profileDetailsReducer,
    userBalances: userBalancesReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;