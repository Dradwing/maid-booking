import React from "react";
import axios from "axios";

import * as Loader from "react-spinners";
import { css } from "@emotion/react";

import ReviewCard from "./Review Card";

axios.defaults.withCredentials = true;
function MaidReviews(props) {
  const [reviews, setreviews] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const override = css`
    position: fixed;
    left: 30%;
    top: 45%;
  `;

  const url = `/api/v1/maids/${props.maid._id}/reviews/`;

  React.useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        setloading(false);
        setreviews(res.data.data.Reviews);
      })
      .catch((err) => {
        setloading(false);
        //show error page
        console.log(err);
      });
  }, []); // eslint-disable-line

  return (
    <>
      <Loader.BarLoader
        color="gray"
        loading={loading}
        css={override}
        size={80}
      />
      <h1 className="Booking-Heading">My Reviews</h1>
      <section className="cont">
        {reviews.map((review) => {
          return <ReviewCard review={review} />;
        })}
      </section>
    </>
  );
}

export default MaidReviews;
