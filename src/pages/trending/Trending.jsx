import React, { useEffect, useState } from "react";
import {
  getDailyTrendingMovies,
  getWeeklyTrendingMovies,
} from "../../api/movieApi";
import "./trending.css";
import { useNavigate, useParams } from "react-router";
import MovieCard from "../../components/MovieCard";

const imgUrl = "https://image.tmdb.org/t/p/w500";

function Trending() {
  const { id } = useParams;
  const navigate = useNavigate();
  const [dailyTrending, setDailyTrending] = useState(null);
  const [weeklyTrending, setWeeklyTrending] = useState(null);

  useEffect(() => {
    getDailyTrendingMovies().then((data) => setDailyTrending(data));
    getWeeklyTrendingMovies().then((data) => setWeeklyTrending(data));
  }, [id]);

  function movieDetailPage(id) {
    navigate(`/details/${id}`);
  }

  let countDaily = 0;
  let countWeekly = 0;

  return (
    <main className="trending">
      <div className="wrapper">
        <div className="trending__page">
          <div className="trending__content">
            <h2>
              Trending DAILY <span>Top 10</span>
            </h2>
            <div className="trending__card">
              {dailyTrending?.slice(0, 10).map((item) => {
                return (
                  <div className="trending__details" key={item.id}>
                    <div className="trending__ranking">
                      {(countDaily = countDaily + 1)}
                    </div>

                    <MovieCard item={item} />
                    {/* <div
                      className="img-container"
                      onClick={() => movieDetailPage(item.id)}
                    >
                      {item.poster_path ? (
                        <img src={imgUrl + item.poster_path} alt={item.title} />
                      ) : (
                        <img
                          src="https://www.clipartmax.com/png/middle/1-10021_clipart-movies-hd-movies-logo-transparent.png"
                          alt={item.title}
                        />
                      )}
                    </div> */}
                    <h3
                      className="trending__title"
                      onClick={() => movieDetailPage(item.id)}
                    >
                      {item.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="trending__content">
            <h2>
              Trending WEEKLY <span>Top 10</span>
            </h2>
            <div className="trending__card">
              {weeklyTrending?.slice(0, 10).map((item) => {
                return (
                  <div className="trending__details" key={item.id}>
                    <div className="trending__ranking">
                      {(countWeekly = countWeekly + 1)}
                    </div>
                    <div
                      className="img-container"
                      onClick={() => movieDetailPage(item.id)}
                    >
                      {item.poster_path ? (
                        <img src={imgUrl + item.poster_path} alt={item.title} />
                      ) : (
                        <img
                          src="https://www.clipartmax.com/png/middle/1-10021_clipart-movies-hd-movies-logo-transparent.png"
                          alt={item.title}
                        />
                      )}
                    </div>
                    <h3
                      className="trending__title"
                      onClick={() => movieDetailPage(item.id)}
                    >
                      {item.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Trending;
