import React, { useState, useEffect } from "react";
import "./MyReview.css";
import "./IndividualMovie2.css";
import { getToken } from "../Utlis/Utlis";
import axios from "axios";
import Rating from '@mui/material/Rating';
import { Typography } from "@mui/material";
const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch reviews from the backend API when the component mounts
    axios
      .get("http://localhost:5000/get-my-reviews", {
        headers: {
          token: getToken() 
        },
      })
      .then((res) => {
        console.log(res.data[0].movieReviews)
        setReviews(res.data[0].movieReviews); // Set the fetched reviews to state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setMessage("Failed to fetch reviews");
        setLoading(false); // Stop loading if there's an error
      });
  }, []); 
function handleDeleteReview(e,id){
    e.preventDefault();
    console.log(id);
    axios
    .delete(`http://localhost:5000/delete-review/${id}`, {
      headers: { 
        "token":getToken()
      }
      
    })
    .then((response) => {
      alert(response.data.message);
      window.location.reload();// Refresh reviews after deletion
    })
    .catch((error) => {
      console.error("Error deleting review:", error.response?.data || error.message);
      alert(error.response?.data.error || "Failed to delete review.");
    });

}
    

    return (
        <div className="myReviews">
            <h2>My Reviews</h2>
            {loading?(
        <Typography variant="h5">Fetching from Your List...</Typography>
      ):reviews.length === 0 ? (
                <p>No reviews submitted yet.</p>
            ) : (
                <ul className="reviewsList">
                {reviews.map((review, index) => (
                    <li key={index} className="reviewItem">
                        <div className="reviewContent">
                            <img
                                className="reviewMovieImage"
                                src={`https://image.tmdb.org/t/p/original${review.movieImage}`}
                                alt={review.movieTitle}
                            />
                            <div className="reviewText">
                                <h4 className="reviewMovieTitle">{review.movieTitle}</h4>
                                <p className="reviewDescription"><b>My Review:</b> {review.movieReview}</p>
                                <Rating value={review.myRating} precision={0.5} readOnly sx={{bgcolor:"#45484a"}}/>
                            </div>
                            <button className="deleteReviewButton" onClick={(e) => handleDeleteReview(e,review.movieId)}>
                ❌ Delete Review
            </button>
                        </div>
                    </li>
                ))}
            </ul>
            
            )}
        </div>
    );
};

export default MyReviews;
