// Updated slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  NotificationData,
  NotificationState,
} from "../../interfaces/notification";
import { ErrorResponse } from "../../interfaces/notification";

axios.defaults.withCredentials = true;

export const getAllNotifications = createAsyncThunk<NotificationData[], void, { rejectValue: ErrorResponse }>(
  "notification/getAll", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/notification/user", {
        withCredentials: true,
      });
      return response.data; // Return the list of notifications
    } catch (error: any) {
      return rejectWithValue(error.response.data as ErrorResponse);
    }
  }
);

export const readAllNotification = createAsyncThunk<NotificationData[], void, { rejectValue: ErrorResponse }>(
  "notification/readAll", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/notification/read-all", {}, {
        withCredentials: true,
      });
      return response.data; // Return the updated list of notifications
    } catch (error: any) {
      return rejectWithValue(error.response.data as ErrorResponse);
    }
  }
);

const initialState: NotificationState = {
  notificationsList: [],
  notificationLoading: false,
  notificationError: null,
  count: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notificationsList.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notificationsList = state.notificationsList.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notificationsList = [];
    },
    count_Incress: (state) => {
      state.count += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.notificationLoading = true;
        state.notificationError = null;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.notificationLoading = false;
        state.notificationsList = action.payload;
        state.notificationError = null;
        // Count unread notifications
        state.count = state.notificationsList.filter((x) => !x.read).length;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.notificationLoading = false;
        state.notificationError = action.payload?.message || "An error occurred";
      });

    builder
      .addCase(readAllNotification.pending, (state) => {
        state.notificationLoading = true;
        state.notificationError = null;
      })
      .addCase(readAllNotification.fulfilled, (state, action) => {
        state.notificationLoading = false;
        // Mark all notifications as read and reset the count
        state.notificationsList.forEach((item) => (item.read = true));
        state.count = 0; // Reset count after marking all as read
      })
      .addCase(readAllNotification.rejected, (state, action) => {
        state.notificationLoading = false;
        state.notificationError = action.payload?.message || "An error occurred";
      });
  },
});

export const { addNotification, removeNotification, clearNotifications, count_Incress } = notificationSlice.actions;
export default notificationSlice.reducer;
