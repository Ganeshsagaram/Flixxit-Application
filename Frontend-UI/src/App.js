import React, { useState,useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp"
import Checkboxes from "./ButtonToggle";
import Media from "./components/Player";
import BasicRating from "./Rating";
import Common from "./Common";
import Header from "./Header";
import { UserProvider } from "./UserContext";
import Profile from "./Profile";
import Movies from "./Movie_Components/Movies";
import MoviesComponent from "./MovieComponent";
import PrivateRoute from "./components/PrivateRoute";
import HeaderPage from "./components/HeaderPage";
import HomePage from "./components/HomePage";
import About from "./components/About";
import SearchMovie from "./Movie_Components/SearchMovie";
import QueryMovie from "./Movie_Components/QueryMovie";
import TestInput from "./Movie_Components/TestInput";
import DisplayMovie from "./Movie_Components/DisplayMovie";
import APITesting from "./Movie_Components/APITesting";
import AddMovie from "./Movie_Components/GetMyWatchList";
import GenreSelect from "./Movie_Components/GenredDropDown";
import GetMyWatchList from "./Movie_Components/GetMyWatchList";
import Player from "./components/Player";

import SlideShow from "./components/SlideShow";
import IndividualMovie from "./Movie_Components/IndividualMovie";
import LoginAlternate from "./Login/LoginAlternate";
import BeforLoginHeader from "./components/BeforLoginHeader"
import { Navigate } from "react-router-dom";
import { getToken } from "./Utlis/Utlis";
import MyReviews from "./Movie_Components/MyReviews";
import UserProfileUpdate from "./ProfileUpdate/UserProfileUpdate";
import Logout from "./Logout";
import LogOut from "./components/LogOut";
import SignupAlternate from "./SignUp/SignUpAlternate";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    
  };
  return (


<Router>
      <div>
  
           { !getToken()?(<>
            <Routes>
            <Route
              path="/login"
              element={<Login onLogin={()=>handleLogin} />}
            />
           
            <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/" element={<BeforLoginHeader isLoggedIn={isLoggedIn}/>}></Route>
    <Route path="/home" element={<HomePage />} />
    <Route path="/about" element={<About />} />
    <Route path="/eachmovie/:id" element={<IndividualMovie />} />

          </Routes>
           </>
        ):(
          <div className="container mt-4">
              
             <HeaderPage/>
          <Routes>
          {/* <Route path="/home" element={
          <>
            <HeaderPage />
            <HomePage />
          </>}/> */}

            <Route path="/movie/:movieKind" element={<Movies />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/query" element={<QueryMovie />} />
            <Route
              path="/get-my-watchlist"
              element={<PrivateRoute component={<GetMyWatchList />} />}
            />
            <Route
              path="/sort-by-genre"
              element={<PrivateRoute component={<GenreSelect />} />}
            />
            <Route path="/slideshow" element={<SlideShow />} />
            <Route path="/eachmovie/:id" element={<IndividualMovie />} />
            <Route path="/headerpage" element={<HeaderPage />} />
            <Route path="/player/:id" element={<Player/>}></Route>
            <Route path="/my-reviews" element={<MyReviews/>}></Route>
            <Route path="/profile" element={<UserProfileUpdate/>}></Route>
            
            </Routes>
        </div>
        )}
          
        
        
      </div>
    </Router>
  
  );
};



export default App;

