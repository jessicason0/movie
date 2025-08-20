import React from "react";

function SkeletonMovieDetail() {
  return (
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
  );
}

export default SkeletonMovieDetail;
