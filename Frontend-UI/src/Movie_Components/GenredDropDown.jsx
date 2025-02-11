import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import genresData from './genres.json';
import { useEffect } from 'react';
import "../Cards/card.css";
import Cards from '../Cards/Card';
import { Card } from '@mui/material';
import { useState } from 'react';
import PlayCards from '../Cards/PlayCards';

// import dotenv from 'dotenv';
// dotenv.config();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:process.env.REACT_APP_BEARER_TOKEN }
};
export default function GenreSelect() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [movieDetails, setMovieDetails] = useState([]);
  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    const selectedValue = e.target.textContent; 
    setSelectedGenre(selectedValue); 
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!selectedGenre) return; // Avoid unnecessary API calls

    // Find the genre ID based on selected genre name
    const genreObj = genresData.genres.find((genre) => genre.name === selectedGenre);
    const genreID = genreObj ? genreObj.id : '';

    if (genreID) {
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreID}`,options)
        .then(res => res.json())
        .then((data) => {
          if (data.results) {
            const formattedMovies = data.results.map(result => ({
              id:result.id,
              title: result.original_title,
              date: result.release_date,
              poster: result.poster_path,
              vote_average:result.vote_average,
              overview:result.overview,
              rating: result.adult ? "Above 18+" : "Anyone can watch"
            }));
            setMovieDetails(formattedMovies);
          }
        })
        .catch(err => console.error("Error fetching movies:", err));
    }
  }, [selectedGenre]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {selectedGenre ? selectedGenre : "Select Genre"}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {genresData.genres.map((genre) => (
          <MenuItem key={genre.id} onClick={handleClose}>
            {genre.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Display movie cards below the menu */}
      <div style={{ marginTop: "20px" }}>
        {movieDetails.length > 0 ? (
          movieDetails.map((movie, index) => <Cards key={index} movie={movie} />)
        ) : (
          <p style={{color:"red", fontSize:"30px"}}>No movies found. Select a genre.</p>
        )}
      </div>
    </div>
  );

}
