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
  const url = "/api/v1/customers/getMaidsNearMe";

  useEffect(() => {
    if (props.customer === undefined || props.customer.name === undefined) {
      alert("You are logged In as a test customer. ");
      axios({
        method: "POST",
        url: "/api/v1/customers/login",
        data: { email: "testing@gmail.com", password: "testingpass" },
      })
        .then((res) => {
          props.setcustomer(res.data.data.Customer);
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
        })
        .catch((err) => {
          alert(
            "Something went wrong while logging in as test customer! please try again later."
          );
        });
    } else {
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
    }
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
