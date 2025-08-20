import React, { useEffect, useState } from "react";
import "./similarMovies.css";
import { getSimilarMoviesById } from "../../api/movieApi";
import { useNavigate, useParams } from "react-router";

const imgUrl = "https://image.tmdb.org/t/p/w780";

function SimilarMovies() {
  const [similarMovies, setSimilarMovies] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getSimilarMoviesById(id).then((data) => setSimilarMovies(data));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  function movieDetailPage(id) {
    navigate(`/details/${id}`);
  }

  console.log(similarMovies);

  return (
    <div className="similar-movies">
      <h2>Find Similar Movies</h2>
      <div className="similar-movies__content">
        {similarMovies?.slice(0, 8).map((item) => {
          return (
            <div className="similar-movies__card" key={item.id}>
              <div className="img-container">
                {item.backdrop_path ? (
                  <img src={imgUrl + item.backdrop_path} alt={item.title} />
                ) : (
                  <img
                    src="https://www.clipartmax.com/png/middle/1-10021_clipart-movies-hd-movies-logo-transparent.png"
                    alt="logo"
                  />
                )}
              </div>

              <div className="similar-movies__desc">
                <h4>{item.title}</h4>
                <div className="similar-movies__rating">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  <div>{item.vote_average.toFixed(1)}/10</div>
                </div>
                <div className="similar-movies__overview">{item.overview}</div>
                <button onClick={() => movieDetailPage(item.id)}>
                  Movie Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SimilarMovies;
