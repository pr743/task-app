import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";


export const getNotifications = createAsyncThunk(
    "notifications/getNotifications",
    async (_, thunkAPI) => {
        try {
            const res = await API.get("/notifications");
            return res.data.notification;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

export const markAsRead = createAsyncThunk(
    "notifications/markAsRead",
    async (id, thunkAPI) => {
        try {
            await API.patch(`/notifications/${id}`);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message);
        }
    }
);

const notificationSlice = createSlice({
    name: "notifications",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        addNotification: (state, action) => {
            state.list.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder.addCase(markAsRead.fulfilled, (state, action) => {
            const item = state.list.find((n) => n._id === action.payload);
            if (item) item.read = true;
        });
    },
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;