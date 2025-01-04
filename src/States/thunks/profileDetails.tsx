import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const ProfilesDetails = createAsyncThunk(
  "Profiles Details",
  async (
    profilesDetails: {
      email: string;
      accountName: string;
      accountNumber: string;
      bankName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/details",
        {
          email: profilesDetails.email,
          businessName: profilesDetails.accountName,
          accountNumber: profilesDetails.accountNumber,
          bankName: profilesDetails.bankName,
        },
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export type userBalance = {
  businessName: string;
  accountNumber: string;
  bankName: string;
  tonRate: number | null;
  usdtRate: number | null;
  loading: boolean;
  error: string | null | unknown;
  success: boolean;
};

const initialState: userBalance = {
  businessName: "",
  accountNumber: "",
  bankName: "",
  tonRate: 0,
  usdtRate: 0,
  loading: false,
  error: null,
  success: false,
};

const ProfilesDetailsSlice = createSlice({
  name: "ProfilesDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProfilesDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(ProfilesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.businessName = action.payload?.data.businessName;
        state.accountNumber = action.payload?.data.accountNumber;
        state.success = true;
      })
      .addCase(ProfilesDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ProfilesDetailsSlice.reducer;
