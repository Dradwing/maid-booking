import React from "react";
import axios from "axios";
import * as loaders from "react-spinners";
import { css } from "@emotion/react";

function CustomerReviews(props) {
  const [reviews, setreviews] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const override = css`
    position: fixed;
    left: 30%;
    top: 45%;
  `;

  const url = "http://localhost:3000/api/v1/customers/reviews/";

  React.useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        setreviews(res.data.data.reviews);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        //show error page
        console.log(err);
      });
  }, []);

  return (
    <>
      <loaders.PacmanLoader
        color="gray"
        loading={loading}
        css={override}
        size={80}
      />
    </>
  );
}

export default CustomerReviews;
