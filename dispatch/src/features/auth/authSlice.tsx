import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  AuthState,
  ErrorResponse,
  User,
  UserData,
} from "./../../interfaces/auth";

axios.defaults.withCredentials = true;

export const registerUser = createAsyncThunk<
  User,
  UserData,
  { rejectValue: ErrorResponse }
>('users/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/register', userData); // Use relative path
    console.log(response.data);
    return response.data.user;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});


 
export const loginUser = createAsyncThunk<
  User,
  UserData,
  { rejectValue: ErrorResponse }
>("users/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/users/login`, userData, {
      withCredentials: true,
    });

    console.log(response.data);
    return response.data.user;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const setIsAuthenticated = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorResponse }
>("users/isAuthenticated", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/users/check`);
    // console.log(11, response.data);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const loginOut = createAsyncThunk<
  User,
  UserData,
  { rejectValue: ErrorResponse }
>("users/logout", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`api/auth/`, userData);

    console.log(response.data);
    return response.data.user;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});


export const updateUser = createAsyncThunk<
  User,
  UserData,
  { rejectValue: ErrorResponse }
>("users/update", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.put("/api/users/update", userData, {
      withCredentials: true,
    });
    console.log("API response:", response); // Log the full response to inspect it
    return response.data; // Ensure this matches the actual response structure
  } catch (error: any) {
    console.error("API error:", error.response);
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const logOut: any = createAsyncThunk<
   
  { rejectValue: ErrorResponse }
>('users/logout', async (_,{ rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/logout',); 
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

const initialState: AuthState = {
  loginLoading: false,
  signupLoading: false,
  otpLoading: false,
  appLoading: true,
  appLoadingError: null,
  user: {},
  loginError: null,
  signupError: null,
  otpError: null,
  userUpddateError: null,
  userUpdateLoading: false,
  isAuthenticated: false,
  callCount: 0,
};

 

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload?.message ?? null;
        state.user = {};
      });

    builder
      .addCase(setIsAuthenticated.pending, (state) => {
        state.appLoading = true;
      })
      .addCase(setIsAuthenticated.fulfilled, (state, action) => {
        state.appLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.callCount += 1; // Increment call count on success
      })
      .addCase(setIsAuthenticated.rejected, (state, action) => {
        state.appLoading = false;
        state.isAuthenticated = false;
        state.callCount += 1; // Increment call count on failure
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.signupLoading = true;
        state.signupError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupError = null;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.signupLoading = false;
        state.signupError = action.payload?.message ?? null;
        state.isAuthenticated = false;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.userUpdateLoading = true;
        state.userUpddateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userUpdateLoading = false;
        console.log(121, action)
        state.user = { ...state.user, ...action.payload }; 
        state.userUpddateError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.userUpdateLoading = false;
        state.userUpddateError = action.payload?.message ?? null;
      });

      builder
      .addCase(logOut.pending, (state) => {
        // state.userUpdateLoading = true;
        // state.userUpddateError = null;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        // state.userUpdateLoading = false;
        // console.log(121, action)
        // state.user = { ...state.user, ...action.payload }; 
        // state.userUpddateError = null;
        state.isAuthenticated = false
      })
      .addCase(logOut.rejected, (state, action) => {
        // state.userUpdateLoading = false;
        // state.userUpddateError = action.payload?.message ?? null;
      });
  },
});

export default authSlice.reducer;
