import React from "react";
import axios from "axios";
import * as loaders from "react-spinners";
import { css } from "@emotion/react";
import "./card.css"
import ReviewCard from "./Rewiew Card";

function CustomerReviews(props) {
  const [reviews, setreviews] = React.useState([{name: "Yss Lodu"}, {name: "Yss Lodu"}, {name: "Yss Lodu"}, {name: "Yss Lodu"}]);
  const [loading, setloading] = React.useState(true);
  const override = css`
    position: fixed;
    left: 30%;
    top: 45%;
  `;

  // const url = "http://localhost:3000/api/v1/customers/reviews/";

  // React.useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: url,
  //   })
  //     .then((res) => {
  //       setreviews(res.data.data.reviews);
  //       setloading(false);
  //     })
  //     .catch((err) => {
  //       setloading(false);
  //       //show error page
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <h1 className="Booking-Heading">My Reviews</h1>
      <section className="cont">
          {console.log(reviews)}
          {reviews.map((data) => {
            return <ReviewCard data={data} />;
          })}
      </section>
    </>
  );
}

export default CustomerReviews;
