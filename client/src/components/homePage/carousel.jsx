import React from "react";
import { Link } from "react-router-dom";
function Carousel() {
  return (
    <>
      <div className="carousel">
        <div className="carouselContent">
          <h2>Book a Maid</h2>
          <p style={{ fontFamily: "Poppins, san-serif", fontWeight: "bold" }}>
            Here we provide monthly subscription for booking maids at reasonable
            prices.
          </p>
          <Link
            to={`/findMaids/`}
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            {" "}
            <button className="mainButton">Find Maids</button>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Carousel;
