import React, {useEffect, useState} from "react"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import "../Cards/card.css"
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import PlayArrowSharp from "@mui/icons-material/PlayArrowSharp";
import AddIcon from '@mui/icons-material/Add';
import "./hidden.css"
import axios from "axios";
import { getToken } from "../Utlis/Utlis";
import RemoveIcon from '@mui/icons-material/Remove';
// import { useParams } from "react-router-dom";
// import '../Movie_Components/IndividualMovie.css'

const MyCards = ({key,movie}) => {

    const [isLoading, setIsLoading] = useState(true)
    // const {id}=useParams();
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 
    function removeMovieFromMyList(e,movieId){
        e.preventDefault();
        console.log("Removing movie with ID:", movieId);

        axios.delete(`https://ganesh-backend-do4x.onrender.com/delete-movie/${movieId}`, {
            headers: {
                "token": getToken()
            }
        })
        .then((res) => {
            alert(res.data);
            console.log("Response from API:", res.data);
            window.location.reload();
        })
        .catch(err => {
            alert(err.response?.data || "An error occurred");
            console.log("Error is", err.response?.data);
        });
    
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
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.Movie_poster:""}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                        
                    </div>
                    {/* <div className="card__description">{movie ? movie.Synposis.slice(0,118)+"..." : ""}</div> */}
                    <span>
                    <Button size="medium" sx={{color:"red", width:"30px"}}>{<PlayArrowSharp sx={{fontSize:"45px"}}/>}</Button>
                    
                    <Button size="medium" sx={{color:"red", width:"30px"}} onClick={(e)=>removeMovieFromMyList(e,movie.id)}>{<RemoveIcon sx={{fontSize:"30px"}}/>}</Button>
                    <Link to={`/eachmovie/${movie.id}`} className="movie-details-link">Get Details</Link>
                    </span>
                    
                    
                   
                
                </div>
            </div>
        </Link>
        
    }
    </>
}

export default MyCards