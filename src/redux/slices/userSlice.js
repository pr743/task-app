import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";


export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async (data, thunkAPI) => {

        try {
            const res = await API.put("/users/profile", data);
            return res.data.user;

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);

        }
    }
);


export const changePassword = createAsyncThunk(
    "user/changePassword",
    async (data, thunkAPI) => {
        try {
            const res = await API.put("/users/password", data);
            return res.data.message;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);

        }

    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        loading: false,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export default userSlice.reducer;