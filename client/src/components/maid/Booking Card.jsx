import React from "react";

const BookingCard = (props) => {
  return (
    <>
      <div className="book-card">
        <section className="date">
          <img src={props.booking.customer.photo} alt="" />
        </section>
        <section className="card-cont">
          <span>{props.booking.customer.name}</span>
          <span>Booking Date: {props.booking.createdAt}</span>
          <span>
            Work start Date:{" "}
            {new Date(props.booking.startingDate).toLocaleDateString()}
          </span>
          <span>
            Services:{" "}
            {props.booking.services.map((service) => service.toString() + " ")}
          </span>
          <span>Total Price: {props.booking.price}</span>
        </section>
      </div>
    </>
  );
};

export default BookingCard;
