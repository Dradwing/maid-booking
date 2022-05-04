import React from "react";
import { Link } from "react-router-dom";

function MaidProfile(props) {
  return (
    <>
      <div className="profile">
        <p
          style={{
            fontSize: "large",
            fontWeight: "550",
            position: "absolute",
            right: "40px",
          }}
        >
          <Link
            to="/maid/updateProfile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Edit
          </Link>
        </p>
        <span style={{ marginBottom: "30px" }}>
          {" "}
          <img src={props.maid.photo} alt="" />{" "}
        </span>
        <p>Name: {props.maid.name}</p>
        <p>Email: {props.maid.email}</p>
        <p>Mobile Number: {props.maid.mobileNumber}</p>
        <p>Address: {props.maid.address[0].toString()}</p>
        <p>Aadhaar Number: {props.maid.aadhaarNumber}</p>
        <p>
          Services:{" "}
          {props.maid.services.map((service) => service.toString() + " ")}
        </p>
        <p>Price set per serivce: {props.maid.price}</p>
        <p>Availability: {props.maid.availability ? "yes" : "no"}</p>
        <p>Your Rating: {props.maid.ratingAverage}</p>
        <p>Your experience: {props.maid.experience}</p>

        <Link to="/maid/reviews">
          <button>My Reviews</button>
        </Link>
      </div>
    </>
  );
}
export default MaidProfile;
