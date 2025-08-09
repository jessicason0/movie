import React, { useEffect, useState } from "react";
import { getMovieReviewById } from "../../api/movieApi";
import { useParams } from "react-router";
import "./reviews.css";

function Reviews() {
  const [review, setReview] = useState(null);
  const [expandedReview, setExpandedReview] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getMovieReviewById(id).then((data) => setReview(data));
  }, []);

  console.log(review);

  function toggleReview() {
    setExpandedReview((prev) => !prev);
  }

  //   function toggleReview(reviewId) {
  //     setExpandedReview((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  //   }

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {review?.length < 1 ? (
        <div className="reviews__none">
          <p>Be the First to Leave a Review!</p>
          <input type="text" />
          <button>Submit</button>
        </div>
      ) : (
        <div className="reviews__content">
          {review?.slice(0, 4).map((item) => {
            return (
              <div className="reviews__content-card" key={item.id}>
                <div className="reviews__name">{item.author}</div>
                <div className="reviews__rating">
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
                  Rating <div>{item.author_details.rating}/10</div>
                </div>

                <div>
                  {expandedReview ? (
                    <div>
                      <div>{item.content} </div>
                      <button
                        className="reviews-btn"
                        onClick={() => toggleReview(item.id)}
                      >
                        Show Less
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div>
                        {item.content.length > 400
                          ? item.content.slice(0, 400) + "... "
                          : item.content}{" "}
                      </div>
                      <button
                        className="reviews-btn"
                        onClick={() => toggleReview(item.id)}
                      >
                        Show More
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Reviews;
