import React from "react";

const BookingCard = (props) => {
  return (
    <>
      <div className="book-card">
        <section className="date">
          <img src={props.booking.maid.photo} alt="" />
        </section>
        <section className="card-cont">
          <span>{props.booking.maid.name}</span>
          <span>Booking Date: {props.booking.maid.createdAt}</span>
          <span>
            Work start Date:{" "}
            {props.booking.startingDate.toISOString().slice(0, 10)}
          </span>
          <span>
            Services:{" "}
            {props.booking.services.map((service) => service.toString() + " ")}
          </span>
          <span>Total Price: {props.booking.price}</span>
          <button>Give Feedback</button>
        </section>
      </div>
    </>
  );
};

export default BookingCard;
