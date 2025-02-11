import axios from 'axios';
import React, { useEffect } from 'react'
import Cards from '../Cards/Card';

export function DisplayMovie({ movie }) {
    // useEffect(()=>{

    // },[])
    return (
      <div>You Entered:
        <br/> 
        Movie Name:{movie.movie} 
      <br/>
    Image:{movie.poster}
    <br/>
    
      Date:{movie.ReleaseDate}
      <br/>
      Rating:{movie.rating}
      
      </div>
      
    );
  }

// export  function showMyMovies(){
//     return (
//         <div>
//             My Movies
//         </div>
//     );
// }
