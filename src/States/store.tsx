import { configureStore } from "@reduxjs/toolkit";
import loginUserReducer from "./thunks/auth";
import userBalancesReducer from "./thunks/balance";
export const store = configureStore({
  reducer: {
    login: loginUserReducer,           
    userBalances: userBalancesReducer,           
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;