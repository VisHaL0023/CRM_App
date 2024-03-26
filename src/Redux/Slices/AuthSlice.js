import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || "",
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
};

const authSlice = createSlice({
  name: "auth",
  initalState,
  reducers: {},
});

export default authSlice.reducer;
