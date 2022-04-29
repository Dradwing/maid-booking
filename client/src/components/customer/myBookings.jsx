import React from "react";
import axios from "axios";
import BookingCard from "./Booking Card";
import "./card.css"

function CustomerBookings(props) {

  // test krne k liye temp data h in array m 
  // jb actual m krenge to api call se data store krake OOKing card m data pass kra denge

  let currentBookings = [
    { name: "YSS Lodu" },
    { name: "YSS Lodu" },
    { name: "YSS Lodu" },
    { name: "YSS Lodu" },
  ];
  let pastBookings = [
    { name: "YSS Lodu" },
    { name: "YSS Lodu" },
    { name: "YSS Lodu" },
    { name: "YSS Lodu" },
  ];
  // const url = "http://localhost:3000/api/v1/customers/myBookings/";
  // axios({
  //   method: "GET",
  //   url: url,
  // })
  //   .then((res) => {
  //     currentBookings = res.data.data.currentBookings;
  //     pastBookings = res.data.data.pastBookings;
  //   })
  //   .catch((err) => {
  //     //show error page
  //     console.log(err);
  //   });

  return (
    <>
      <h1 className="Booking-Heading">My current Bookings</h1>
      <section className="cont">
          {console.log(currentBookings)}
          {currentBookings.map((data) => {
            return <BookingCard />;
          })}
      </section>

      <h1 className="Booking-Heading">My Previous Booking</h1>
      <section className="cont">
          {pastBookings.map((data) => {
            return (
              <BookingCard
              // price={data.price}
              // services={data.services}
              // createdAt={data.createdAt}
              />
            );
          })}
      </section>
    </>
  );
}

export default CustomerBookings;
