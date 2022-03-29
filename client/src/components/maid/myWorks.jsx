import React from "react";
import axios from "axios";

function MaidBookings(props) {
  let currentWorks = [];
  let pastWorks = [];
  const url = "http://localhost:3000/api/v1/maids/myWorks/";
  axios({
    method: "GET",
    url: url,
  })
    .then((res) => {
      currentWorks = res.data.data.currentWorks;
      pastWorks = res.data.data.pastWorks;
    })
    .catch((err) => {
      //show error page
      console.log(err);
    });

  return (
    <>
      <h3>Maid bookings will be shown here after requesting from server</h3>
    </>
  );
}

export default MaidBookings;
