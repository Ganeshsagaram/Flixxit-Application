import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp"

import Movies from "./Movie_Components/Movies";

import PrivateRoute from "./components/PrivateRoute";
import HeaderPage from "./components/HeaderPage";
import HomePage from "./components/HomePage";
import About from "./components/About";

import QueryMovie from "./Movie_Components/QueryMovie";
import GenreSelect from "./Movie_Components/GenredDropDown";
import GetMyWatchList from "./Movie_Components/GetMyWatchList";
import Player from "./components/Player";

import SlideShow from "./components/SlideShow";
import IndividualMovie from "./Movie_Components/IndividualMovie";

import BeforLoginHeader from "./components/BeforLoginHeader"

import { getToken } from "./Utlis/Utlis";
import MyReviews from "./Movie_Components/MyReviews";
import UserProfileUpdate from "./ProfileUpdate/UserProfileUpdate";
import PasswordUpdate from "./SignUp/PasswordUpdate";




const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = (userData) => {
    setIsLoggedIn(true);

  };
  return (


    <Router>
      <div>

        {!getToken() ? (<>
          <Routes>
            <Route
              path="/login"
              element={<Login onLogin={() => handleLogin} />}
            />

            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/" element={<BeforLoginHeader isLoggedIn={isLoggedIn} />}></Route>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/eachmovie/:id" element={<IndividualMovie />} />
          <Route path="/passwordupdate" element={<PasswordUpdate/>}></Route>
          </Routes>
        </>
        ) : (
          <div className="container mt-4">

            <HeaderPage />
            <Routes>


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
              <Route path="/player/:id" element={<PrivateRoute component={<Player />} />}></Route>
              <Route path="/my-reviews" element={<PrivateRoute component={<MyReviews />} />}></Route>
              <Route path="/profile" element={<UserProfileUpdate />}></Route>
            </Routes>
          </div>
        )}



      </div>
    </Router>

  );
};



export default App;

