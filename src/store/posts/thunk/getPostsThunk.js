import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("posts/getPosts", () =>
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data)
    .catch((err) => err)
);

export const getPostReducers = {
  [getPosts.pending]: (state) => {
    state.loading = true;
  },
  [getPosts.fulfilled]: (state, { payload: posts }) => {
    state.posts = posts;
    state.loading = false;
  },
  [getPosts.rejected]: (state, { payload: error }) => {
    state.error = error;
    state.loading = false;
  },
};
