import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload: { email, password } }) => {
      state.email = email;
      state.password = password;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.isLoggedIn = false;
    },
    setLoading: (state, { payload: { isLoading } }) => {
      state.isLoading = isLoading;
    },
    setError: (state, { payload: { error } }) => {
      state.error = error;
    },
  },
});

export const { login, logout, setLoading, setError } = userSlice.actions;

export const selectUser = (state) => state.user;

export const userReducer = userSlice.reducer;
