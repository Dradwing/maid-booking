import React from "react";
import "./card.css";

const ReviewCard = (props) => {
  return (
    <>
      <div className="book-card review-card">
        <section className="date">
            <img src="https://st.depositphotos.com/1011646/1675/i/450/depositphotos_16759927-stock-photo-five-stars.jpg" alt="" />
        </section>
        <section className="card-cont">
          <span style={{marginBottom: "10px"}}>Reviewer`s Name: Paras Don</span>
          <span style={{marginBottom: "10px"}}>Rewiew Date: 23 Apr 2022</span>
          <span style={{marginBottom: "10px"}}>Comment: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat ullam </span>
        </section>
      </div>
    </>
  );
};

export default ReviewCard;
