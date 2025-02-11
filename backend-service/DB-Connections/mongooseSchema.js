import mongoose from "mongoose";

// Define the Movies schema
const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});

// Define the User schema with a reference to the Movies collection
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,  // Referencing movie schema
      ref: "Movie",
    },
  ],
});

// Creating models
const Movie = mongoose.model("Movie", movieSchema);
const User = mongoose.model("User", userSchema);

export { Movie, User };
