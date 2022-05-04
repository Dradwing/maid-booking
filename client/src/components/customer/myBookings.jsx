import React from "react";
import axios from "axios";
import BookingCard from "./Booking Card";
function CustomerBookings(props) {
  const [currentBookings, setcurrentBookings] = React.useState([]);
  const [pastBookings, setpastBookings] = React.useState([]);
  const url = "/api/v1/customers/myBookings/";
  React.useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        setcurrentBookings(res.data.data.CurrentBookings);
        setpastBookings(res.data.data.PastBookings);
      })
      .catch((err) => {
        //show error page
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1 className="Booking-Heading">My current Bookings</h1>
      <section className="cont">
        {currentBookings.length === 0 ? (
          <h2>No Booking available yet! </h2>
        ) : (
          currentBookings.map((booking) => {
            return <BookingCard booking={booking} />;
          })
        )}
      </section>

      <h1 className="Booking-Heading">My Previous Bookings</h1>
      <section className="cont">
        {pastBookings.length === 0 ? (
          <h2>No Booking available yet! </h2>
        ) : (
          pastBookings.map((booking) => {
            return <BookingCard booking={booking} />;
          })
        )}
      </section>
    </>
  );
}

export default CustomerBookings;
