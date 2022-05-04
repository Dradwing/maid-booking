import React from "react";
import { Link } from "react-router-dom";

function CustomerProfile(props) {
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
            to="/customer/updateProfile"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Edit
          </Link>
        </p>
        <span style={{ marginBottom: "30px" }}>
          {" "}
          <img src={props.customer.photo} alt="" />{" "}
        </span>
        <p>Name: {props.customer.name}</p>
        <p>Email: {props.customer.email}</p>
        <p>Mobile Number: {props.customer.mobileNumber}</p>
        <p>Address: {props.customer.address[0].toString()}</p>
        <Link to="/customer/reviews">
          <button>My Reviews</button>
        </Link>
      </div>
    </>
  );
}
export default CustomerProfile;
