import React, { useEffect, useState } from "react";
import "./movieDetails.css";
import { getMovieDetailById } from "../../api/movieApi";
import { useParams } from "react-router";
import Reviews from "./Reviews";
import SimilarMovies from "./SimilarMovies";
import SkeletonMovieDetail from "./SkeletonMovieDetail";

const imgUrl = "https://image.tmdb.org/t/p/w780";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    getMovieDetailById(id).then((data) => setMovieDetail(data));
  }, [id]);

  console.log(movieDetail);

  if (movieDetail === null) return;

  const year = movieDetail.release_date.slice(0, 4);

  return (
    <div className="detail">
      <div className="wrapper">
        {movieDetail ? (
          <div className="detail__content">
            <div className="detail__top">
              <div className="img-container">
                <img
                  src={imgUrl + movieDetail.backdrop_path}
                  alt={movieDetail.title}
                />
              </div>
              <div className="detail__desc">
                <h2>Description</h2>
                <div className="detail__desc-detail">
                  <div className="detail__desc-title">
                    <h3>{movieDetail.title}</h3>
                    <div>{year}</div>
                  </div>
                  <div className="detail__desc-genre">
                    <span>Genre:</span>
                    <div>
                      {movieDetail.genres.map((item) => (
                        <div key={item.id}>{item.name}</div>
                      ))}
                    </div>
                  </div>
                  <p>{movieDetail.overview}</p>
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
        ) : (
          <SkeletonMovieDetail />
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
