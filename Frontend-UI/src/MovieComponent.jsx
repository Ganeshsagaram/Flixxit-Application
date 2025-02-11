import React from 'react'
import { useState,useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// import results from './imgs/data.json'
// or
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
// import dotenv from 'dotenv';
// dotenv.config();

const optionsHeader={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTljMzFmZGI1YWRiNmI5YWRmODc4N2ZmYmM2N2M3NyIsIm5iZiI6MTcyODQ5MDAxNC44MjcwMDAxLCJzdWIiOiI2NzA2YWExZTdlM2NlZTdkM2Y5Y2Y1MTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ol874qbfuaMMLcRXoAFHQmnCzYscMWt26c-CWH5jPtU"
    }
}


export default function MoviesComponent() {

    let {movieKind}=useParams();

console.log(movieKind)
if(movieKind==='top'||movieKind==='toprated'){
  movieKind="top_rated"
}
if(movieKind.toLowerCase()==="popularmovies"||movieKind.toLowerCase()==="popularity"){
movieKind="popular"
}


const [movies,setMovies]=useState([]);
useEffect(()=>{
    const apiURL=`https://api.themoviedb.org/3/movie/${movieKind}?language=en-US&page=1`;
    fetch(apiURL, optionsHeader).then(response=>response.json())
    .then(data=>
{
    const movieDetails=data.results.map(result=>
        
        
        (
      
        {
        title:result.original_title,
        date:result.release_date,
        poster:result.poster_path,
        rating:(result.adult)?"above 18+":"Anyone can watch"
    }));
    setMovies(movieDetails);
}).catch(error=>console.error("unable to fetch",error))


},[movieKind]);

  return (
    <ImageList sx={{ width: 1500, height: 550 }} cols={10}>
      {movies.map((movie) => (
        <ImageListItem key={movie.title}>
          {movie.poster?<img
            srcSet={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            
          />:(<p>No image available</p>)}
          <Typography variant="string" color='info' align='inherit'>
 {movie.title}-&nbsp;
 {movie.date}&nbsp; rating:{movie.rating}
</Typography>
        </ImageListItem>
      ))}
    </ImageList>
  )
}