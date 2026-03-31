import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectReducer from "./slices/projectSlice";
import taskReducer from "./slices/taskSlice";
import commentReducer from "./slices/commentSlice";
import notificationReducer from "./slices/notificationSlice";
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    tasks: taskReducer,
    comments: commentReducer,
    notifications: notificationReducer,
    user: userReducer,
  },
});
