import React from "react";

function CardForReviews(props) {
  return (
    <div className="cardforreviews">
      <div className="writer">
        <p
          style={{
            display: "inline-block",
            fontSize: "x-large",
            fontWeight: "600",
          }}
        >
          {props.review.customer.name}
        </p>
        <p
          style={{
            display: "inline",
            float: "right",
            backgroundColor:
              props.review.rating < 2
                ? "rgb(220,53,69)"
                : props.review.rating < 3
                ? "rgb(255,193,7)"
                : props.review.rating < 4
                ? "rgb(13,202,240)"
                : props.review.rating < 5
                ? "rgb(13,110,253)"
                : "rgb(25,135,84)",
            color: "white",
            padding: "6px 12px",
            borderRadius: "5px",
          }}
        >
          {props.review.rating}
        </p>
      </div>

      <div className="write">
        <p>{props.review.review}</p>
      </div>
    </div>
  );
}
export default CardForReviews;
