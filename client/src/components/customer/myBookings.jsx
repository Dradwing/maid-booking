import React from "react";
import axios from "axios";

function CustomerBookings(props) {
  let currentBookings = [];
  let pastBookings = [];
  const url = "http://localhost:3000/api/v1/customers/myBookings/";
  axios({
    method: "GET",
    url: url,
  })
    .then((res) => {
      currentBookings = res.data.data.currentBookings;
      pastBookings = res.data.data.pastBookings;
    })
    .catch((err) => {
      //show error page
      console.log(err);
    });

  return (
    <>
      <h3>Customer bookings will be shown here after requesting from server</h3>
    </>
  );
}

export default CustomerBookings;
