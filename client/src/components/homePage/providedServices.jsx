import React from "react";
import CookingMaid from "./../../Images/CookingMaid.jpg";
import cleaning from "./../../Images/cleaning.jpg";
import laundry from "./../../Images/Laundry.jpg";
import BabySitting from "./../../Images/BabySitting.jpg";
import ElderlyCare from "./../../Images/elderlyCare.jpg";
import { Link } from "react-router-dom";
import Flip from "react-reveal/Flip";

function ProvidedServices() {
  return (
    <>
      <div className="providedServices">
        <div className="wraper">
          <h2 style={{ textAlign: "center", fontWeight: "600" }}>
            What we offer?
          </h2>
          <Flip left>
            <div className="points">
              <img src={CookingMaid} alt="Not available"></img>
              <p
                style={{
                  fontSize: "30px",
                  margin: "15px 0",
                  fontWeight: "600",
                  marginBottom: "0",
                }}
              >
                Cooking
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                Homecooks who cook delightful meals which gives the warmth and
                comfort of home.
              </p>
              <Link
                to={`/findMaids/`}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <p className="btn">Book Now</p>
              </Link>
            </div>
          </Flip>
          <Flip left>
            <div className="points">
              <img src={cleaning} alt="Not available"></img>
              <p
                style={{
                  fontSize: "30px",
                  margin: "15px 0",
                  fontWeight: "600",
                  marginBottom: "0",
                }}
              >
                Cleaning
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                We strictly believe that cleanliness is next to godliness and we
                mean it.
              </p>
              <Link
                to={`/findMaids/`}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <p className="btn">Book Now</p>
              </Link>
            </div>
          </Flip>
          <Flip left>
            <div className="points">
              <img src={laundry} alt="Not available"></img>
              <p
                style={{
                  fontSize: "30px",
                  margin: "15px 0",
                  fontWeight: "600",
                  marginBottom: "0",
                }}
              >
                Laundry
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                Launders, who are ultimate in professional care, will keep your
                cloths new forever.
              </p>
              <Link
                to={`/findMaids/`}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <p className="btn">Book Now</p>
              </Link>
            </div>
          </Flip>
          <div className="wraper" style={{ maxWidth: "800px" }}>
            <Flip left>
              <div
                className="points"
                style={{ width: "46%", margin: "10px 2% 10px 2%" }}
              >
                <img src={BabySitting} alt="Not available"></img>
                <p
                  style={{
                    fontSize: "30px",
                    margin: "15px 0",
                    fontWeight: "600",
                    marginBottom: "0",
                  }}
                >
                  Baby Sitting
                </p>
                <p style={{ fontSize: "14px", margin: 0 }}>
                  {" "}
                  Super speedy, super simple, super sensible maids! Sweet Dreams
                  for You and Your Child.
                </p>
                <Link
                  to={`/findMaids/`}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  <p className="btn">Book Now</p>
                </Link>
              </div>
            </Flip>
            <Flip left>
              <div className="points" style={{ width: "46%" }}>
                <img src={ElderlyCare} alt="Not available"></img>
                <p
                  style={{
                    fontSize: "30px",
                    margin: "15px 0",
                    fontWeight: "600",
                    marginBottom: "0",
                  }}
                >
                  Elderly Care
                </p>
                <p style={{ fontSize: "14px", margin: 0, padding: "0 2px" }}>
                  Our approach is the good life for seniors citizens and we are
                  dedicate to it.
                </p>
                <Link
                  to={`/findMaids/`}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  <p className="btn">Book Now</p>
                </Link>
              </div>
            </Flip>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProvidedServices;
