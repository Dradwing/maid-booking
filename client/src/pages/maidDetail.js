import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Loader from "react-spinners";
import { css } from "@emotion/react";

function MaidDetail() {
  const override = css`
    position: absolute;
    left: 30%;
    top: 45%;
  `;
  const [loading, setloading] = React.useState(true);
  const [maidDetail, setmaidDetail] = React.useState({});
  const url = `http://localhost:3000/maids/maid/${useParams().maidId}`;

  React.useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        setloading(false);
        setmaidDetail(res.data.Maid);
      })
      .catch((err) => {
        setloading(false);
        //error page;
        console.log(err);
      });
  });

  return (
    <>
      <Loader.BarLoader
        color="gray"
        loading={loading}
        css={override}
        size={80}
      />
      <h5>
        complete details of maid here including reviews with a book now button
      </h5>
    </>
  );
}

export default MaidDetail;
