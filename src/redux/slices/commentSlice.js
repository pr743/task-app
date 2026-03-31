import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

export const getComments = createAsyncThunk(
    "tasks/getComments",
    async (taskId, thunkAPI) => {
        try {
            const res = await API.get(`/comments/${taskId}`);
            return res.data.comments;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    },
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (data, thunkAPI) => {
        try {
            const res = await API.post("/comments", data);
            return res.data.comment;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    },
);

export const deleteComment = createAsyncThunk(
    "/deleteComment",
    async (commentId, thunkAPI) => {
        try {
            await API.delete(`/comments/${commentId}`);
            return commentId;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    },
);

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder.addCase(addComment.fulfilled, (state, action) => {
            state.comments.push(action.payload);
        });

        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.comments = state.comments.filter((c) => c._id !== action.payload);
        });
    },
});

export default commentSlice.reducer;
