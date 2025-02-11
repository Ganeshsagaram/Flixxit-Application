import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "../Cards/card.css"
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import PlayArrowSharp from "@mui/icons-material/PlayArrowSharp";
import AddIcon from '@mui/icons-material/Add';
import "./hidden.css"
import axios from "axios";
import { getToken } from "../Utlis/Utlis";

const Cards = ({key,movie}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 
function getMovieDetails(e){
    e.preventDefault();
    axios.post("http://localhost:5000/add-to-my-list",{
        id:movie.id,
        movieName:movie.title,
        date:movie.date,
        rating:movie.vote_average,
        poster:movie.poster,
        content:movie.overview

    },{
        headers:{
            "token":getToken()
        }
    }).then((res)=>{
        alert(res.data)
        console.log("Response from API:", res.data);
    }).catch(err=>{
        alert(err.response.data);
        console.log("Error is ",err.response.data);
    })
    console.log(movie);
}
    return <>
    {
        isLoading
        ?
        <div className="cards">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
       <Link to={`/player/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster:""}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                        
                    </div>
                    <div className="card__description">{movie.overview ? movie.overview.slice(0,118)+"..." : ""}</div>
                    <span>
                    <Button size="medium" sx={{color:"red", width:"30px"}}>{<PlayArrowSharp sx={{fontSize:"45px"}}/>}</Button>
                    {
                        getToken()?(
                            <Link to={`/player/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
                                <span>
                                <Button size="medium" sx={{color:"red", width:"30px"}} onClick={getMovieDetails}>{<AddIcon sx={{fontSize:"30px"}}/>}</Button>
                            
                                </span>
                           
                            </Link>
                            
                        ):(
                            <></>
                        )
                    }
                    <Link to={`/eachmovie/${movie.id}` } className="movie-details-link">Get Details</Link>
                    
                    </span>
                    
                    
                   
                
                </div>
            </div>
         </Link>
        
    }
    </>
}

export default Cards