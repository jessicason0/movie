import React, { useEffect, useState } from "react";
import HomeGenre from "./HomeGenre";
import { getMovies } from "../api/movieApi";

function HomeContent() {
  const [movieData, setMovieData] = useState(null);
  useEffect(() => {
    getMovies().then((data) => setMovieData(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {movieData?.map((item) => {
        return (
          <HomeGenre key={item.genre} genre={item.genre} movies={item.movies} />
        );
      })}
    </div>
  );
}

export default HomeContent;
