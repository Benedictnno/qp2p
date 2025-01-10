import { configureStore } from "@reduxjs/toolkit";
import {reducers} from "./thunks/auth";
import userBalancesReducer from "./thunks/balance";
import transactionsReducer from "./thunks/transactions";
import  {profileReducers} from "./thunks/profileDetails";
export const store = configureStore({
  reducer: {
    login: reducers.loginUser,
    registerUser: reducers.registerUser,
    profileDetails: profileReducers.ProfileDetails,
    updateProfileDetails: profileReducers.UpdateProfilesDetails,
    userBalances: userBalancesReducer,
    transactions: transactionsReducer,
  }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;