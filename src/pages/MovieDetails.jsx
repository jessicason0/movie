import React, { useEffect, useState } from "react";
import "./movieDetails.css";
import { getMoviesById } from "../api/movieApi";
import { useParams } from "react-router";

const imgUrl = "https://image.tmdb.org/t/p/w500";

function MovieDetails() {
  const [movieDetail, setMovieDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getMoviesById(id).then((data) => setMovieDetail(data));
  }, []);

  console.log(movieDetail);

  return (
    <div className="detail">
      <div className="wrapper">
        <div className="detail__content">
          <div>
            <div className="img-container">
              <img src="img" alt="img" />
            </div>
            <div className="detail__desc">
              <h2>title</h2>
              <div>release date</div>
              <div>genres</div>
              <p>description overview</p>
            </div>
          </div>
          <div className="detail__reviews">
            <div>username</div>
            <div>review description content</div>
            <div>svg + rating</div>
          </div>
          <div className="detail__recommended">
            <div className="img-container">
              <img src="img" alt="img" />
            </div>
            <div className="detail__recommended-desc">
              <div>
                <h3>title</h3>
                <div>svg + rating</div>
                <div>description overview</div>
              </div>
              <button>Movie Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
