import UserModel from "../models/UserModel.js";
import HistoryModel from "../models/HistoryModel.js";
import axios from "axios";

const OMDB_API_KEY = "KEY";
const OMDB_API_URL = "https://www.omdbapi.com/";

export const fetchMovie = async (req, res) => {
  try {
    const { title } = req.body;
    const response = await axios.get(`${OMDB_API_URL}?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
    if (response.data.Response === 'False') {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const movieData = {
      imdbID: response.data.imdbID,
      Title: response.data.Title,
      Rated: response.data.Rated,
      Released: response.data.Released,
      Runtime: response.data.Runtime,
      Genre: response.data.Genre,
      Director: response.data.Director,
      Actors: response.data.Actors,
      Plot: response.data.Plot,
      Language: response.data.Language,
      Country: response.data.Country,
      Poster: response.data.Poster,
      imdbRating: response.data.imdbRating,
    };

    const historyEntry = new HistoryModel(movieData);
    await historyEntry.save();
    return res.status(200).json({ movieData });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchHistory = async (req, res) => {
  try {
    const history = await HistoryModel.find()
    .sort({ createdAt: -1 })
    .limit(10);

    res.status(200).json({ history });
  } catch (err) {
    console.error('Fetch history error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Toggle favorite movie
export const toggleFavorite = async (req, res) => {
  try {
    const { userId, movie } = req.body;
    const imdbID = movie?.imdbID;
    if (!userId || !imdbID) {
      return res.status(400).json({ message: "User ID and IMDb ID are required" });
    }
    
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const existingIndex = user.favorites.findIndex(movie => movie.imdbID === imdbID);
    
    if (existingIndex === -1) {
      const movieDetails = await HistoryModel.findOne({ imdbID });
      if (!movieDetails) {
        return res.status(404).json({ message: "Movie details not found" });
      }
      user.favorites.push(movieDetails);
    } else {
      user.favorites.splice(existingIndex, 1);
    }
    
    await user.save();
    res.status(200).json({ message: "Favorite list updated", favorites: user.favorites });
  } catch (err) {
    console.error("Toggle favorite error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFavorites = async(req, res) => {
    const { userId } = req.params;
    try{
      const user = await UserModel.findById({ _id: userId });
      const favorites = user.favorites;
      return res.status(200).json({favorites});
    } catch(err){
      return res.status(500).json({ message: "Internal server error" });
    }
}
