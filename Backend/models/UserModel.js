import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [{
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
    }]
});

const UserModel = model('User', UserSchema);

export default UserModel;