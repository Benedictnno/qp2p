import { configureStore } from "@reduxjs/toolkit";
import {reducers} from "./thunks/auth";
import userBalancesReducer from "./thunks/balance";
import transactionsReducer from "./thunks/transactions";
import getBuyerUserDataReducer from "./thunks/getBuyerUserData";
import verifySendersWalletReducer from "./thunks/verifySendersWallet";
import  {profileReducers} from "./thunks/profileDetails";
import {TonWalletReducers} from "./thunks/CryptoDetails";


export const store = configureStore({
  reducer: {
    login: reducers.loginUser,
    registerUser: reducers.registerUser,
    profileDetails: profileReducers.ProfileDetails,
    updateProfileDetails: profileReducers.UpdateProfilesDetails,
    userBalances: userBalancesReducer,
    getBuyerUserData: getBuyerUserDataReducer,
    verifyWallet: verifySendersWalletReducer,
    transactions: transactionsReducer,
    tonAddress: TonWalletReducers.TonAddressSlice,
    tonMnemonics: TonWalletReducers.TonMnemonicsSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;