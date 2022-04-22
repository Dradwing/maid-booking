import { React, useState, useEffect } from "react";
import axios from "axios";
import * as Loader from "react-spinners";
import { css } from "@emotion/react";
import MaidCard from "../Cards/maidCard";
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
        console.log(props.filters);
        console.log(maids);
      })
      .catch((err) => {
        setloading(false);
        //show error component
        console.log(err);
      });
  }, [props.filters]); // eslint-disable-line

  return (
    <>
      <Loader.BarLoader
        color="gray"
        loading={loading}
        css={override}
        size={80}
      />
      {/*show cards of maids*/}
      <div className="maidsList">{maids.map((maid) => createCard(maid))}</div>
    </>
  );
}

function createCard(maid) {
  return (
    <>
      <MaidCard maid={maid} />
    </>
  );
}
export default ShowMaids;
