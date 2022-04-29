import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardForReviews from "../Cards/cardForReviews";
function Reviews(props) {
  const { innerWidth: width, innerHeight: height } = window;
  var settings = {
    infinite: true,
    speed: 500,
    slidesPerRow: 1,
    slidesToShow: width > 768 ? 3 : 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {props.maid !== undefined && props.maid.reviews !== undefined ? (
        <div className="reviews">
          <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
            Rating and Reviews
          </h3>
          <div className="rating">
            <div className="ratingbox">
              <p className="actualRating">{props.maid.ratingAverage}</p>
              <p
                style={{
                  color: "white",
                  fontSize: "x-large",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {props.maid.ratingAverage === 1
                  ? "Aweful"
                  : props.maid.ratingAverage === 2
                  ? "Not Good"
                  : props.maid.ratingAverage === 3
                  ? "Average"
                  : props.maid.ratingAverage === 4
                  ? "Good"
                  : "Fantastic"}
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: "large",
                  textAlign: "center",
                }}
              >
                {props.maid.ratingsQuantity} reviews
              </p>
            </div>
            <div className="reviewSlider">
              <Slider {...settings}>
                {props.maid.reviews.map((review) => (
                  <CardForReviews review={review}></CardForReviews>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Reviews;
