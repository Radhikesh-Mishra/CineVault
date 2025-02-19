import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice.js";
import authReducer from "../slices/authSlice.js";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    auth: authReducer,
  },
});

export default store;