import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import projectReducer from "../features/project/projectSlice"
import taskReducer from "../features/task/taskSlice"
import notificationsReducer from "../features/notification/notificationSlice"
export const store = configureStore({
  reducer: {
    authorization: authReducer,
    project: projectReducer,
    task: taskReducer,
    notifications: notificationsReducer,
  },
 
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


