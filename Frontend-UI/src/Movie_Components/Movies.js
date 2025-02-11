import React from 'react'
import { useState,useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import Cards from '../Cards/Card';
import PlayCards from '../Cards/PlayCards';


export default function Movies() {


const optionsHeader={
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:process.env.REACT_APP_BEARER_TOKEN
    }
}
let {movieKind}=useParams();

console.log(movieKind)
// if(movieKind==='top'||movieKind==='toprated'){
//   movieKind="top_rated"
// }
// if(movieKind==="popularmovies"||movieKind==="popularity"){
// movieKind="popular"
// }else{
//     movieKind="popular"
// }


const [movies,setMovies]=useState([]);
useEffect(()=>{
    const apiURL=`https://api.themoviedb.org/3/movie/${movieKind}?language=en-US&page=1`;
    fetch(apiURL, optionsHeader).then(response=>response.json())
    .then(data=>
{
    const movieDetails=data.results.map(result=>
        
        
        (
      
        {
          id:result.id,
          title: result.original_title,
          date: result.release_date,
          poster: result.poster_path,
          vote_average:result.vote_average,
          overview:result.overview,
          rating: result.adult ? "Above 18+" : "Anyone can watch"
    }));
    setMovies(movieDetails);
}).catch(error=>console.error("unable to fetch",error))


},[movieKind]);

  return (
movies.map((movie, index) => <Cards key={index} movie={movie} />)
  )
}
