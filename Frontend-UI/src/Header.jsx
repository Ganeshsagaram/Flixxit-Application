import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./SignUp/SignUp";
import Checkboxes from "./ButtonToggle";
import ToggleButton from '@mui/material/ToggleButton';

export default function Header() {
    const [page,setPage]=useState(false);
      function handlePage(){
        setPage((page)=>!page);
        console.log(`${page}`)
      }
  return (
    <div>
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid" >
            <div style={
              {
                display:'flex',
                justifyContent:"center",
                alignItems:"center"
              }
            }>
            <Link className="navbar-brand" to="/login" >Auth App</Link>
            </div>
            

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                  {page?(<li className="nav-item">
                <ToggleButton
          style={{
            padding: "20px",
            width: "70px",
            height: "50px",
            color:"black"
          }}
          onClick={handlePage}

        > 
  <Link className="nav-link" to="/login" style={{
    // color:"blue",
    // background:"yellow"
  }}>Login</Link>
              </ToggleButton>


                </li>):
                (<li className="nav-item">
<ToggleButton
          style={{
            padding: "20px",
            width: "70px",
            height: "50px",
            
          }}
          onClick={handlePage}
        >                   <Link className="nav-link" style={{
          // color:"red",
          // background:"black"
        }}to="/signup">SignUp</Link></ToggleButton>

                </li>)}
              </ul>
            </div>
          </div>
        </nav>
    <div className="container mt-6"></div>

    </div>
    </div>
  )
}
