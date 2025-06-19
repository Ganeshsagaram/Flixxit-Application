import React, { useState, Fragment, useContext, useEffect, useRef, useActionState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderPage2.css";
import { clearTokens, getToken } from "../Utlis/Utlis";
import { Menu, Close, Padding } from "@mui/icons-material"; // Material Icons
import { UserContext } from "../UserContext";
import "./logout.css";
import caret_icon from '../assets/caret_icon.svg';
import { Stack, Avatar } from "@mui/material";  // Correct Avatar import
import profile_img from '../assets/profile_img.png';
import { Button } from "@mui/material";
import HomePage from "./HomePage";
import axios from "axios";
import { deepPurple } from "@mui/material/colors";
import "./spaceheader.css"
// // Custom Avatar Component
// const CustomAvatar = ({ userName }) => {
//   // console.log(userName);
//   return <Avatar>{userName}</Avatar>;
// };

export default function HeaderPage() {
  const [menuOpen, setMenuOpen] = useState(false); 
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName,setUserName]=useState("")
  useEffect(() => {
    const token = localStorage.getItem("token")||sessionStorage.getItem("token"); // Assuming token is stored in localStorage
    axios
      .get("https://backend-service-5ktn.onrender.com/get-user", {
        headers: { token },
      })
      .then((res) => setUserName(res.data.userName))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);
  const navigate=useNavigate()
  function logout(e) {
    e.preventDefault();
    clearTokens();
    navigate("/", { replace: true }); 
    window.location.reload();
    setMenuOpen(false); 
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Fragment>
      <header className="header">
        <div className="logo">
          <h1>Flixxit</h1>
        </div>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={handleMenuToggle}>
          {menuOpen ? <Close /> : <Menu />}
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <ul>
            <Link to={"/home"} onClick={closeMenu}>Home</Link>
            <Link to={"/movie/popular"} onClick={closeMenu}>Popular</Link>
            <Link to={"/movie/top_rated"} onClick={closeMenu}>Rated</Link>
            <Link to={"/about"} onClick={closeMenu}>About</Link>
            <Link to={"/query"} onClick={closeMenu}>Search</Link>
            <Link to={"/get-my-watchlist"} onClick={closeMenu}>Get-My-WatchList</Link>
            <Link to={"/sort-by-genre"} onClick={closeMenu}>Sort-Genre</Link>
            <Link to={"/my-reviews"} onClick={closeMenu}>My-Reviews</Link>
           
            <div 
            className="navbar-profile" 
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            {/* <img src={profile_img} alt="Profile" className="profile" /> */}
            <Avatar sx={{bgcolor:deepPurple[500]}}>{userName?userName[0].toUpperCase():"U"}</Avatar>
            <img src={caret_icon} alt="Dropdown Icon" className="caret-icon" />
            

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/before-login" className="dropdown-item" onClick={logout}>Log Out</Link>
              </div>
            )}
          </div>
          </ul>
        </nav>
      </header>

      {/* Page content wrapper (ensures space below header) */}
      <div className="space-header">
       
      </div>
    </Fragment>
  );
}
