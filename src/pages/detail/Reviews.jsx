import React, { useEffect, useState } from "react";
import { getMovieReviewById } from "../../api/movieApi";
import { useParams } from "react-router";
import "./reviews.css";
import ReviewCard from "./ReviewCard";

function Reviews() {
  const [review, setReview] = useState(null);
  const [expandedReview, setExpandedReview] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getMovieReviewById(id).then((data) => setReview(data));
  }, []);

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {review?.length === 0 ? (
        <div className="reviews__submit">
          <p>Be the First to Leave a Review!</p>
          <input type="text" />
          <button>Submit</button>
        </div>
      ) : (
        <div className="reviews__container">
          <div className="reviews__content">
            {review?.slice(0, 4).map((item) => {
              return <ReviewCard item={item} key={item.id} />;
            })}
          </div>
          <div className="reviews__submit">
            <p>Submit a Review!</p>
            <input type="text" />
            <button>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reviews;
