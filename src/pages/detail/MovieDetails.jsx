import React, { useEffect, useState } from "react";
import "./movieDetails.css";
import { getMovieDetailById } from "../../api/movieApi";
import { useParams } from "react-router";
import Reviews from "./Reviews";
import SimilarMovies from "./SimilarMovies";

const imgUrl = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const [movieDetail, setMovieDetail] = useState(null); // can this be set as true?
  const year = movieDetail?.release_date.slice(0, 4);
  const { id } = useParams();

  useEffect(() => {
    getMovieDetailById(id).then((data) => setMovieDetail(data));
  }, []);

  console.log(movieDetail);

  return (
    <div className="detail">
      <div className="wrapper">
        <div className="detail__content">
          <div className="detail__top">
            <div className="img-container">
              <img
                src={imgUrl + movieDetail?.backdrop_path}
                alt={movieDetail?.title}
              />
            </div>
            <div className="detail__desc">
              <h2>Description</h2>
              <div className="detail__desc-detail">
                <div className="detail__desc-title">
                  <h3>{movieDetail?.title}</h3>
                  <div>{year}</div>
                </div>
                <div className="detail__desc-genre">
                  <span>Genre: </span>{" "}
                  {movieDetail?.genres.map((item) => (
                    <div key={item.id}>{item.name}</div>
                  ))}
                </div>
                <p>{movieDetail?.overview}</p>
              </div>
            </div>
          </div>
          <div className="detail__reviews">
            <Reviews />
          </div>
          <div className="detail__similar">
            <SimilarMovies />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
