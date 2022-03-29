import { React, useState, useEffect } from "react";
import axios from "axios";
import * as Loader from "react-spinners";
import { css } from "@emotion/react";
function ShowMaids(props) {
  const [loading, setloading] = useState(true);
  const [maids, setmaids] = useState([]);

  const override = css`
    position: absolute;
    left: 30%;
    top: 45%;
  `;
  const url = "http://localhost:3000/api/v1/maids/";

  useEffect(() => {
    axios({
      method: "GET",
      url: url,
      params: props.filters,
    })
      .then((res) => {
        setmaids(res.data.data.Maids);
        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        //show error component
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
      <h6>show cards of maids</h6>
    </>
  );
}
export default ShowMaids;
