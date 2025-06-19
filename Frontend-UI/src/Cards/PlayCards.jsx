import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "../Cards/card.css";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import PlayArrowSharp from "@mui/icons-material/PlayArrowSharp";
import AddIcon from "@mui/icons-material/Add";
import "./hidden.css";
import axios from "axios";
import { getToken } from "../Utlis/Utlis";

const PlayCards = ({ key, movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  function getMovieDetails(e) {
    e.preventDefault(); // Prevent form submission
    axios
      .post(
        "https://backend-service-4mar.onrender.com/add-to-my-list",
        {
          id: movie.id,
          movieName: movie.title,
          date: movie.date,
          rating: movie.vote_average,
          poster: movie.poster,
          content: movie.overview,
        },
        {
          headers: {
            token: getToken(),
          },
        }
      )
      .then((res) => {
        alert(res.data);
        console.log("Response from API:", res.data);
      })
      .catch((err) => {
        alert(err.response.data);
        console.log("Error is ", err.response.data);
      });
  }

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <div className="cards">
          {/* Clickable Image for Movie Details */}
          <Link to={`/eachmovie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
            <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?.poster || ""}`} alt={movie?.title} />
          </Link>

          <div className="cards__overlay">
            <div className="card__title">{movie?.title || ""}</div>
            <div className="card__runtime">
              {movie?.date || ""}
              <span className="card__rating">
                {movie?.vote_average || ""}
                <i className="fas fa-star" />
              </span>
            </div>
            <div className="card__description">{movie.overview ? movie.overview.slice(0, 118) + "..." : ""}</div>

            <div className="card__buttons">
              {/* Play Button - Navigates to player route */}
              <Link to={`/player/${movie.id}`} style={{ textDecoration: "none" }}>
                <Button size="medium" sx={{ color: "red", width: "30px" }}>
                  <PlayArrowSharp sx={{ fontSize: "45px" }} />
                </Button>
              </Link>

              {/* Add Button - Only triggers API call when clicked */}
              {getToken() && (
                <Button size="medium" sx={{ color: "red", width: "30px" }} onClick={getMovieDetails}>
                  <AddIcon sx={{ fontSize: "30px" }} />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayCards;
