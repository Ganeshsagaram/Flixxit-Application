

import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import axios from "axios";
import MyCards from "../Cards/MyWatchListCards";
import { getToken } from "../Utlis/Utlis";
import { useLocation, Link } from "react-router-dom";

export default function GetMyWatchList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetchMovies();
  }, [location]);

  const fetchMovies = () => {
    setLoading(true);
    axios
      .get("http://https://backend-service-5ktn.onrender.com/get-movies", {
        headers: { token: getToken() },
      })
      .then((res) => {
        if (res.data && res.data.length > 0 && res.data[0].movieDetails) {
          setMovies(res.data[0].movieDetails);
          console.log(res.data[0].movieDetails);
        } else {
          setMovies([]);
        }
      })
      .catch((err) => {
        console.log("Error:", err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Typography variant="h4">Your Watchlist</Typography>

      {loading ? (
        <Typography variant="h5">Fetching from Your List...</Typography>
      ) : movies.length > 0 ? (
        <>
    {movies.map((movie, index) => (
      <MyCards key={index} movie={movie} />
    ))}

    {/* Add More Movies Link */}
    <Typography variant="h6" sx={{ marginTop: 2 }}>
      Want to add more movies?{" "}
      <Link
        to="/query"
        style={{ color: "blue", textDecoration: "underline", fontWeight: "bold" }}
      >
        Click Here
      </Link>
    </Typography>
  </>
        
      ) : (
        <Typography variant="h6">
          <span>
            No movies found in your watchlist.
            <br />
            <Link
              to="/movie/popular"
              style={{ color: "blue", textDecoration: "underline", fontWeight: "bold" }}
            >
              Click Here
            </Link>{" "}
            to browse popular movies.
          </span>
        </Typography>
      )}

      
      
    </div>
  );
}
