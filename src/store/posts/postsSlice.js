import { createSlice } from "@reduxjs/toolkit";
import { getPostReducers } from "./thunk/getPostsThunk";

const defaultState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState: defaultState,
  reducers: {
    setPosts: (state, { payload: posts }) => {
      state.posts = [...posts];
    },
    deletePostByID: (state, { payload: id }) => {
      state.posts = state.posts.filter((post) => post.id !== Number(id));
    },
    sortPostsByAZ: (state) => {
      // sort post state by alphabetically
      state.posts.sort((a, b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    },
    sortPostsByZA: (state) => {
      // sort post state by reverse alphabetically
      state.posts.sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });
    },
    sortPostsByID: (state) => {
      // sort posts by ID
      state.posts.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
    },
    sortPostsByIDReverse: (state) => {
      //sort posts by ID reverse
      state.posts.sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
    },
  },
  extraReducers: {
    ...getPostReducers,
  },
});

export const selectState = {
  posts: (state) => state.posts.posts,
  loading: (state) => state.posts.loading,
  error: (state) => state.posts.error,
};

export const {
  setPosts,
  deletePostByID,
  sortPostsByAZ,
  sortPostsByZA,
  sortPostsByID,
  sortPostsByIDReverse,
} = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
