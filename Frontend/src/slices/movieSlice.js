import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/movie";

export const fetchMovie = createAsyncThunk("movies/fetchMovie", async (title) => {
  const response = await axios.post(`${API_URL}/fetchMovie`, { title });
  return response.data.movieData;
});

export const fetchHistory = createAsyncThunk("movies/fetchHistory", async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data.history;
});

export const toggleFavorite = createAsyncThunk(
  "movies/toggleFavorite",
  async ({ movie, userId }) => {
    const response = await axios.post(`${API_URL}/toggleFavorite`, { movie, userId });
    return response.data.updatedFavorites;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    searchResults: [],
    history: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.searchResults = [action.payload, ...state.searchResults].slice(0, 10);
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchMovie.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
