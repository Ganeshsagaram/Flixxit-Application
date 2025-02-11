import { TextField, Typography } from '@mui/material'
import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {Button} from '@mui/material';
import { DisplayMovie} from './DisplayMovie';
import Cards from '../Cards/Card';
import "./SearchMovie.css"
// import './querymovie.css'
// import dotenv from 'dotenv';
// dotenv.config();
const optionsHeader={
    method: 'GET',
    headers: {
      accept: 'application/json',
    //Authorization:process.env.BEARER_TOKEN
    Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTljMzFmZGI1YWRiNmI5YWRmODc4N2ZmYmM2N2M3NyIsIm5iZiI6MTcyODQ5MDAxNC44MjcwMDAxLCJzdWIiOiI2NzA2YWExZTdlM2NlZTdkM2Y5Y2Y1MTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ol874qbfuaMMLcRXoAFHQmnCzYscMWt26c-CWH5jPtU"
  
  }
}

export default function QueryMovie() {
    const [searchQuery, setSearchQuery] = useSearchParams();
    const [inputValue, setInputValue] = useState("");
    const [movie,setMovie]=useState({});
  
    function handleInputChange(e) {
      setInputValue(e.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      if(inputValue===""){
        alert("Enter movie name")
      }
      else if (inputValue.trim()) {
        setSearchQuery({ query: inputValue });
        // getMovie = searchQuery.get('query');
        console.log("input movie",inputValue); // This will log the movie name
        setInputValue("");
        // setSearchQuery("")
      }
    }
  
    const [data, setData] = useState(false);
  
    useEffect(() => {
      const apiURL = `https://api.themoviedb.org/3/search/movie?${searchQuery}&include_adult=false&language=en-US&page=1`;
      fetch(apiURL, optionsHeader)
        .then(response => response.json())
        .then((data) => {
          if (data) {
            let obj={
              id:data.results[0].id,
              title:data.results[0].title,
              date:data.results[0].release_date,
              poster:data.results[0].poster_path,
              vote_average:data.results[0].vote_average,
              overview:data.results[0].overview,
              rating:data.results[0].adult ? "Above 18+" : "Anyone can watch"
            }
            setData(true);
            setMovie(obj)
            console.log(obj);
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    }, [searchQuery]);
  
    return (
      <div className="main">
        <Typography variant="h2">QueryMovie</Typography>
        <span className='search'>
        <form onSubmit={handleSubmit}>
         
         <TextField
           type="text"
           name="query"
           value={inputValue}
           onChange={handleInputChange}
           placeholder="Enter Movie Name"
           id="outlined-basic"
         variant="outlined"
         fullWidth
         label="Search"
           
         />
         <Button type="submit" variant='primary'>Enter</Button>
       </form>
        </span>
        <br/>
        <br/>
        {data ? (
            <>
            
            <Cards movie={movie}/>
            </>
           
        ) : (
          <></>
        )}
        
      </div>
    );
  }

