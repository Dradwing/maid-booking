import React from "react";
import axios from "axios";

function MaidReviews(props) {
  let reviews = [];
  const url = `http://localhost:3000/api/v1/maids/${props.maid._id}/reviews/`;
  axios({
    method: "GET",
    url: url,
  })
    .then((res) => {
      reviews = res.data.data.reviews;
    })
    .catch((err) => {
      //show error page
      console.log(err);
    });

  return (
    <>
      <h3>Maid Reviews will be shown here after requesting from server</h3>
    </>
  );
}

export default MaidReviews;
