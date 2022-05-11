import React from "react";
import ReviewWindow from "../homePage/reviewWindow";

const BookingCard = (props) => {
  const [toggle, settoggle] = React.useState(false);

  return (
    <>
      <ReviewWindow
        maid={props.booking.maid}
        toggle={toggle}
        settoggle={settoggle}
      />
      <div className="book-card">
        <section className="date">
          <img src={props.booking.maid.photo} alt="" />
        </section>
        <section className="card-cont">
          <span>{props.booking.maid.name}</span>
          <span>
            Booking Date:{" "}
            {new Date(props.booking.createdAt).toLocaleDateString()}
          </span>
          <span>
            Work start Date:{" "}
            {new Date(props.booking.startingDate).toLocaleDateString()}
          </span>
          <span>
            Services:{" "}
            {props.booking.services.map((service) => service.toString() + " ")}
          </span>
          <span>Total Price: {props.booking.price}</span>
          <button
            onClick={() => {
              settoggle(true);
            }}
          >
            Give Feedback
          </button>
        </section>
      </div>
    </>
  );
};

export default BookingCard;
