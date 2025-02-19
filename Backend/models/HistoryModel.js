import { Schema, model } from "mongoose";

const HistorySchema = Schema({
    imdbID: String,
    Title: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Actors: String,
    Language: String,
    Country: String,
    Plot: String,
    Poster: String,
    imdbRating: String,
}, {timestamps: true});

const HistoryModel =  model('History', HistorySchema);

export default HistoryModel;