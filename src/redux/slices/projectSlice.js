import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";


export const createProject = createAsyncThunk(
  "projects/create",
  async (data) => {
    const res = await API.post("/projects", data);
    return res.data.project;
  }
);


export const getProjects = createAsyncThunk(
  "projects/get",
  async (tenantId) => {
    const res = await API.get(`/projects/tenant/${tenantId}`);
    return res.data.projects;
  }
);


export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ projectId, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/projects/${projectId}`, data);
      return res.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const deleteProject = createAsyncThunk(
  "projects/delete",  
  async (projectId, { rejectWithValue }) => {
    try {
      await API.delete(`/projects/${projectId}`);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const projectSlice = createSlice({
  name: "projects",

  initialState: {
    projects: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder

      
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })

      
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })

      
      .addCase(updateProject.fulfilled, (state, action) => {
        state.projects = state.projects.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })

     
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (p) => p._id !== action.payload
        );
      });
  },
});

export default projectSlice.reducer;