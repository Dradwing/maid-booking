import React from "react";
import "./card.css";

const BookingCard = (props) => {
  return (
    <>
      <div className="book-card">
        <section className="date">
            <img src="https://pps.whatsapp.net/v/t61.24694-24/255572396_936575797019649_6959774590794396536_n.jpg?ccb=11-4&oh=e30d1035b3293210adc7ea8c2923d15b&oe=627D4EA3" alt="" />
        </section>
        <section className="card-cont">
          <span>Maid Name: YSS</span>
          <span>Booking Date: 23 Apr 2022</span>
          <span>Services: Cleaning</span>
          <span>Hope you enjoyed service!!! <button>Give Feedback</button> </span>
        </section>
      </div>
    </>
  );
};

export default BookingCard;
