import React from "react";

import StarRatings from "react-star-ratings";

const ReviewCard = (props) => {
  return (
    <>
      <div className="book-card review-card">
        <section className="date">
          <img src={props.review.maid.photo} alt="Not available" />
        </section>
        <section className="card-cont">
          <span style={{ textTransform: "capitalize" }}>
            {props.review.maid.name}
            <p
              style={{
                display: "inline",
                float: "right",
                margin: 0,
                fontSize: "small",
              }}
            >
              {new Date(props.review.createdAt).toLocaleDateString()}
            </p>
          </span>

          <StarRatings
            rating={props.review.rating}
            starRatedColor="gold"
            numberOfStars={5}
            name="rating"
            starDimension="30px"
            starSpacing="4px"
          />
          <span style={{ margin: "5px 0px" }}>{props.review.review} </span>
        </section>
      </div>
    </>
  );
};

export default ReviewCard;
