import React, { useEffect, useState } from "react";
import "./upcoming.css";
import { getUpcomingMovies } from "../../api/movieApi";
import { useParams } from "react-router";
import { genreData, genreDataById } from "../../lib/genreData";

const imgUrl = "https://image.tmdb.org/t/p/w500";

function Upcoming() {
  const { id } = useParams;
  const [upcomingData, setUpcomingData] = useState(null);

  useEffect(() => {
    getUpcomingMovies().then((data) => {
      // const newData = data.map((item) => {
      //   const genre_ids = item.genre_ids.map((id) => {
      //     const s = genreData.find((genres) => genres.id === id);
      //     return s.name;
      //   });
      //   return { ...item, genre_ids };
      // });

      setUpcomingData(data);
    });
  }, [id]);

  function dateToWords(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const dateStr = "2023-08-14";
  const words = dateToWords(dateStr);

  return (
    <div className="upcoming">
      <div className="wrapper">
        <h1>Upcoming Movies</h1>
        <div className="upcoming__content">
          {upcomingData?.map((item) => {
            return (
              <div className="upcoming__card" key={item.id}>
                <div className="img-container">
                  {item.backdrop_path ? (
                    <img src={imgUrl + item.backdrop_path} alt={item.title} />
                  ) : (
                    <img
                      src="https://www.clipartmax.com/png/middle/1-10021_clipart-movies-hd-movies-logo-transparent.png"
                      alt={item.title}
                    />
                  )}
                </div>
                <div className="upcoming__details">
                  <div className="upcoming__title">{item.title}</div>
                  <div className="upcoming__date">
                    <span>Release Date:</span> {dateToWords(item.release_date)}
                  </div>
                  <div className="upcoming__genre">
                    <div className="upcoming__genre-heading">Genre: </div>
                    <div className="upcoming__genre-box">
                      {item.genre_ids.map((genre) => (
                        <div key={genre}>{genreDataById[genre]}</div>
                      ))}
                    </div>
                  </div>
                  <p className="upcoming__overview">
                    {item.overview.length > 800
                      ? item.overview.slice(0, 800) + "..."
                      : item.overview}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
