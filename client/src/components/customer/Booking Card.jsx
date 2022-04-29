import React from "react";
import "./card.css";

const BookingCard = (props) => {
  return (
    <>
      <div className="book-card">
        <section className="date">
            <span>23</span>
            <span>feb</span>
        </section>
        <section className="card-cont">
          <span>Price: 50</span>
          <span>Services: Cleaning</span>
          <span>Hope you enjoyed service!!!</span>
        </section>
      </div>
    </>
  );
};

export default BookingCard;
