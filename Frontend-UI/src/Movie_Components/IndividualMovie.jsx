import React from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './IndividualMovie2.css'
import { getToken } from '../Utlis/Utlis';
import axios from 'axios';
import Rating from '@mui/material/Rating';
// import dotenv from 'dotenv';
// dotenv.config();

const optionsHeader={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:process.env.REACT_APP_BEARER_TOKEN
    }
}
export default function IndividualMovie() {
    const [currentMovieDetail, setMovie] = useState();
    const [value, setValue] = React.useState(0);

   
    const { id } = useParams()
    console.log(id)
    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}`,optionsHeader)
        .then(res => res.json())
        .then(data => setMovie(data))
    };
    const [review, setReview] = useState("");
    const [message, setMessage] = useState("");

    const handleReviewSubmit = () => {

        if (!review.trim()) {
        setMessage("Review cannot be empty.");
        return;
    }

    const movieId = currentMovieDetail?.id;
    const movieTitle = currentMovieDetail?.original_title;
    const movieImage = currentMovieDetail?.backdrop_path || "";

    // Prepare the review data to send to the backend
    const reviewData = {
        movieId,
        movieTitle,
        movieReview: review,
        movieImage,
        myRating:value
        
    };

    // Send the review data to the backend using Axios
    axios.post('https://backend-service-4mar.onrender.com/add-review', reviewData, {
        headers: {
            token: getToken()  // Assuming you have a method to get the token from the user
        }
    })
    .then((response) => {
        // Handle successful review submission
        if (response.status === 200) {
            setReview("");  // Reset review input
            setMessage("Review submitted successfully!");
            alert("Review submitted successfully!");
            setValue(0)
            console.log(reviewData)
        }
    })
    .catch((err) => {
        // Handle error
        console.error("Error submitting review:", err.response.data);
        
        alert(err.response.data.message?err.response.data.message:err.response.data)
        setMessage("Failed to submit the review. Please try again.");
    });
    };
    return (
        <div className="movie">
            <div className="movie__intro">
             <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                {/* <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div> */}
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                        
                    </div>

                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
            {getToken()?(<div className="movie__reviewSection">
                            <h3>Write a Review</h3>
                            <textarea
                                className="reviewInput"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Share your thoughts about this movie..."
                            />
                            <span>
                            <p>Your Rating</p>
                            <Rating name="half-rating-read" value={value} precision={0.5} onChange={(e,val)=>{
        setValue(e.target.value);
        console.log(e.target.value);
      }} sx={{ color: "gold", fontSize: "2rem",bgcolor:"#45484a" }}>
                                
                                </Rating> 
                            </span>
                           
                            <br/>
                            <button className="submitReviewButton" onClick={handleReviewSubmit}>
                                Submit Review
                            </button>
                             
                            {message && <p className="reviewMessage">{message}</p>}
                        </div>):<p className="loginPrompt">
    Login to review the movie <Link to="/login" className="loginLink">Login</Link>
</p>
}
        </div>
    )
}
