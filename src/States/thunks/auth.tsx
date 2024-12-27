import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dotenv from "dotenv";
import {jwtDecode} from "jwt-decode";

dotenv.config();

export const LoginUser = createAsyncThunk(
  "Login user",
  async (login: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email: login.email, password: login.password },{ withCredentials: true }
      );
     
     const user =  jwtDecode(response.data.refreshToken);
     sessionStorage.setItem('user', JSON.stringify(user));
console.log('====================================');
console.log(JSON.parse(sessionStorage.getItem('user')));
console.log('====================================');
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


export type Login = {
  user: any;
  loading: boolean;
  error: string | null | unknown;
  success: boolean;
};

const initialState: Login = {
  user: "",
  loading: false,
  error: null,
  success: false,
};

const LoginUserSlice = createSlice({
  name: "LoginUser",
  initialState,
  reducers: {},
  extraReducers:  (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
        state.success = true;

      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default LoginUserSlice.reducer;
