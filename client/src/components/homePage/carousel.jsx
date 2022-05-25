import React from "react";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
function Carousel() {
  return (
    <>
      <div className="carousel">
        <div className="carouselContent">
          <h2 style={{ fontWeight: "590" }}>
            {" "}
            <Zoom right cascade>
              Book a Maid
            </Zoom>
          </h2>
          <Zoom right cascade>
            <p
              style={{
                fontFamily: "Poppins, san-serif",
                fontWeight: "bold",
              }}
              className="forPhone"
            >
              Here we provide monthly subscription for booking maids at
              reasonable prices.
            </p>
          </Zoom>
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
