import dotenv from 'dotenv'

import { dbConnection } from '../../backend-service/DB-Connections/mongoConnect.js';
import { ObjectId } from 'mongodb';

import jwt from 'jsonwebtoken';

import { Router } from 'express';
export const Moviesapi=Router();
dotenv.config();

Moviesapi.post("/add-to-my-list", async (req, res) => {
    try {
      const connection = await dbConnection();
      const { id,movieName, date, rating, poster, content } = req.body;
  
      if (!movieName || !date || !rating||!poster||!content||!id) {
        return res.status(400).send("Please provide all required movie details.");
      }
  
     
      const userObj = jwt.decode(req.headers.token);
      if (!userObj || !userObj.userID) {
        return res.status(401).send("Unauthorized: No valid user found.");
      }
  
      const userID = new ObjectId(userObj.userID);
      const myEmail=(userObj.email)
      
      const newMovie = {
        id:id,
        movie: movieName,
        release_date: date,
        My_rating: rating,
        Movie_poster:poster,
        Synopsis:content
      };
  
      
      const movieExists = await connection
        .db("My_movies")
        .collection("movies_list")
        .findOne({
          userID: userID,
          "movieDetails.movie": movieName  
        });
  
      if (movieExists) {
        return res.status(400).send(`The movie "${movieName}" is already in your list.`);
      }
      const result = await connection
        .db("My_movies")
        .collection("movies_list")
        .updateOne(
          { userID: userID,
           email:myEmail
          },  
          {
            $push: { movieDetails: newMovie },  
            $setOnInsert: { createdAt: new Date() } 
          },
          { upsert: true } 
        );
  
      console.log("Movie added/updated successfully:", result);
      res.status(200).send("Movie has been added to your list.");
  
    } catch (err) {
      console.error("Error occurred:", err);
      res.status(500).send("Internal Server Error.");
    }
  });

Moviesapi.get("/get-movies",async(req,res)=>{
    const connection=await dbConnection();
    const userObj = jwt.decode(req.headers.token)
    const myMovieList=await connection.db("My_movies").collection("movies_list").find({
      userID:new ObjectId((userObj.userID + ''))
    }).toArray();
    if(myMovieList.length>0){
        res.send(myMovieList);
    }
    else{
        res.send("No movies present in your list");
    }
    
});

Moviesapi.get("/get-movie/:id", async (req, res) => {
  try {
      const connection = await dbConnection();
      const movieID = parseInt(req.params.id); 

      if (isNaN(movieID)) {
          return res.status(400).send("Invalid movie ID");
      }

      
      const userObj = jwt.decode(req.headers.token);
      if (!userObj || !userObj.userID) {
          return res.status(401).send("Unauthorized: Invalid token");
      }

     
      const userMovies = await connection.db("My_movies").collection("movies_list").findOne({
          userID: new ObjectId(userObj.userID),
          "movieDetails.id": movieID 
      });

      if (userMovies) {
                    const movie = userMovies.movieDetails.find(m => m.id === movieID);
          res.send(movie);
      } else {
          res.status(404).send("Movie not found in your list");
      }
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
  }
});


Moviesapi.delete("/delete-movie/:id",async(req,res)=>{
  try {
    const connection = await dbConnection();
    const theMovieToBeDeleted = parseInt(req.params.id); 
    const userObj = jwt.decode(req.headers.token);
  
    const result = await connection
      .db("My_movies")
      .collection("movies_list")
      .updateOne(
        {
          userID: new ObjectId(userObj.userID + ''), 
          "movieDetails.id": theMovieToBeDeleted 
        },
        {
          $pull: { movieDetails: { id: theMovieToBeDeleted } } 
        }
      );
  
    if (result.modifiedCount > 0) {
      res.send("Movie deleted successfully");
    } else {
      res.status(404).send("Movie not found or already deleted");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  
  

});

Moviesapi.post("/add-review",async(req,res)=>{
  
  try {
    const connection = await dbConnection();
    const { movieId, movieTitle, movieReview, movieImage,myRating } = req.body;
    if (!movieId || !movieTitle || !movieReview || !movieImage||!myRating) {
      return res.status(400).send("Please provide all required review details.");
    }

  
    const userObj = jwt.decode(req.headers.token);
    if (!userObj || !userObj.userID) {
      return res.status(401).send("Unauthorized: No valid user found.");
    }

    const userID = new ObjectId(userObj.userID);
    const myEmail = userObj.email;
    const userReviewRecord = await connection
      .db("My_movies")
      .collection("movie_reviews")
      .findOne({ userID });

    const newReview = {
      movieId,
      movieTitle,
      movieReview,
      movieImage,
      myRating,
      createdAt: new Date(),
    };

    if (userReviewRecord) {
      
      const existingReview = userReviewRecord.movieReviews.find(
        (review) => review.movieId === movieId
      );
      if (existingReview) {
        return res.status(400).send("You have already reviewed this movie.");
      }

      const result = await connection
        .db("My_movies")
        .collection("movie_reviews")
        .updateOne(
          { userID },
          { $push: { movieReviews: newReview } } 
        );

      res.status(200).send("Review added successfully.");
    } else {
     
      const newReviewRecord = {
        userID,
        myEmail,
        movieReviews: [newReview],
        createdAt: new Date(),
      };

      const result = await connection
        .db("My_movies")
        .collection("movie_reviews")
        .insertOne(newReviewRecord);

      res.status(200).send("Review added successfully.");
    }
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send("Internal Server Error.");
  }
  });

Moviesapi.get("/get-my-reviews",async(req,res)=>{

  try {
    
    const userObj = jwt.decode(req.headers.token);

   
    if (!userObj || !userObj.userID) {
        return res.status(401).send("Unauthorized: No valid user found.");
    }

   
    const userID = new ObjectId(userObj.userID);

    
    const connection = await dbConnection();

   
    const reviews = await connection
        .db("My_movies")  
        .collection("movie_reviews")  
        .find({ userID: userID })  
        .toArray();

    
    if (reviews.length > 0) {
        return res.status(200).json(reviews);
    } else {
        return res.status(400).send("No reviews found for this user.");
    }
} catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).send("Internal Server Error.");
}

});
Moviesapi.delete("/delete-review/:id", async (req, res) => {
  try {
    const connection = await dbConnection();
    const  movieId  =parseInt(req.params.id);  // Movie ID from frontend

    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required." });
    }

    const userObj = jwt.decode(req.headers.token);
    if (!userObj || !userObj.userID) {
      return res.status(401).json({ error: "Unauthorized: No valid user found." });
    }

    const userID = new ObjectId(userObj.userID);

   
    const reviewExists = await connection
      .db("My_movies")
      .collection("movie_reviews")
      .findOne({ userID, "movieReviews.movieId": movieId });

    if (!reviewExists) {
      return res.status(404).json({ error: "Review not found." });
    }

    
    const result = await connection
      .db("My_movies")
      .collection("movie_reviews")
      .updateOne(
        { userID },
        { $pull: { movieReviews: { movieId } } }
      );

    if (result.modifiedCount > 0) {
      return res.status(200).json({ message: "Review deleted successfully." });
    } else {
      return res.status(500).json({ error: "Failed to delete review." });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error." });
  }
});



