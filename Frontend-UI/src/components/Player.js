

import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = (props) => {
  const state = props.location;
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:process.env.REACT_APP_BEARER_TOKEN } };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0]); // Set only if data exists
        } else {
          console.error("No video results found for this movie.");
        }
      })
      .catch((err) => console.error("Error fetching video:", err));
  }, [id]);

  return (
    <div className="player">
      <div className="player-controls">
        <img src={back_arrow_icon} alt="Back" onClick={() => navigate(-1)} style={{ background: "black" }} />
        {apiData.key ? (
          <iframe
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title="trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Trailer not available</p>
        )}
      </div>
      <div className="player-info">
  <p className="highlight-text">{apiData.published_at ? apiData.published_at.slice(0, 10) : "N/A"}</p>
  <p className="highlight-text">{apiData.type || "N/A"}</p>
</div>

    </div>
  );
};

export default Player;



