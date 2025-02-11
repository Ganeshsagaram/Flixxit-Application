import React from 'react';
import './About.css';


export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About <i>Flixxit</i></h1>
        <p>Your ultimate movie companion</p>
      </div>
      <div className="about-content">
        <p>
          <strong>Flixxit</strong> is an intuitive and user-friendly application designed to enhance your movie-watching experience.
          It allows users to easily search for their favorite movies and explore various details such as genre, release date, and plot summaries.
          With a simple, clean interface, the app makes finding and discovering movies enjoyable and seamless.
        </p>
        <h3>Key Features:</h3>
        <ul>
          <li><strong>Movie Search:</strong> Quickly search for any movie by title or keyword.</li>
          <li><strong>Movie Details:</strong> Get comprehensive information about movies, including descriptions, cast, and ratings.</li>
          <li><strong>Easy Navigation:</strong> A smooth, easy-to-use interface to browse movies and access relevant data.</li>
          <li><strong>Add to WatchList:</strong> Add movie to your Watchlist and watch at anytime</li>
          <li><strong>Review and Rate:</strong> You can add your review and rating for any Movie</li>
        </ul>
        <p>
          Whether you're looking to explore new releases or revisit classic favorites, <strong>Flixxit</strong> is the perfect companion for movie lovers everywhere.

        </p>
      </div>
      {/* <Payment/> */}
    </div>
  );
}
