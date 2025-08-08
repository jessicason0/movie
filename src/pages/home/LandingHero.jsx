import React, { useEffect, useState } from "react";
import "./landingHero.css";
import { getLandingMovie } from "../../api/movieApi";

const imgUrl = "https://image.tmdb.org/t/p/original";

function LandingHero() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getLandingMovie().then((data) => setMovie(data));
  }, []);

  return (
    <div className="hero">
      <div className="hero-background">
        <img src={imgUrl + movie?.backdrop_path} alt="Background Image" />
        <div className="hero-background__gradient"></div>
      </div>
      <div className="hero__desc">
        <h2>All your favorite films in one place.</h2>
        <p>
          Browse thousands of movies across every genre — from the latest
          blockbusters to timeless classics.
        </p>
      </div>
    </div>
  );
}

export default LandingHero;
