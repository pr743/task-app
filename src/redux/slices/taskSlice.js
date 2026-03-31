import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (projectId, thunkAPI) => {
    try {
      const url = projectId ? `/tasks/project/${projectId}` : `/tasks`;
      const res = await API.get(url);
      return res.data.tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/tasks", data);
      return res.data.task;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, status }, thunkAPI) => {
    try {
      const res = await API.patch(`/tasks/${taskId}/status`, { status });

      return res.data.task;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || "Error");
    }
  },
);




export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      return taskId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.unshift(action.payload);
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    });
  },
});

export default taskSlice.reducer;






















