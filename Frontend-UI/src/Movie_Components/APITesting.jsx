import React from 'react'
import axios from 'axios';
export default function APITesting() {
    axios.get("http://localhost:8080/get-movies").then((res)=>{
    res.data.forEach(element => {
        console.log("You added to your WatchList:",element.movie)
     });
    }).catch(err=>{
        console.log(err)
    })
  return (
    <div>

    </div>
  )
}
