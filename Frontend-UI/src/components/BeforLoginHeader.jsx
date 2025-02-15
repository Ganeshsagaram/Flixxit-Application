import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import image from "./Background-image-flixxit.webp";
// import "./BeforeLoginHeader.css"
import "./backgroundimg.css";
export default function Header({ isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
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
            <li><Link to="/home" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/login" >Login</Link></li>
          </ul>
        </nav>
        
      </header>

      {/* Page content wrapper (ensures space below header) */}
      <div className={`page-content ${menuOpen ? "menu-open" : ""}`}>
      <div className="header-instruction">
          <p style={{fontSize:"30px"}}>This is a sample page to demonstrate the header functionality. Explore different sections like <b>'Home', 'About', </b>or <b>'log in'</b> to access more features!</p>
        </div>
        
      </div>

      
    </Fragment>
  );
}
