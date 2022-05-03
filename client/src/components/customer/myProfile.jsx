import React from "react";
import { Link } from "react-router-dom";
import CustomerReviews from "./myReviews";
import "./profile.css"

function CustomerProfile(props) {
  return (
    <>
      <div className="profile">
        <Link to="/customer/updateProfile" exact id="edit-button">Edit</Link>
        <span style={{marginBottom: "30px"}}> <img src="https://pps.whatsapp.net/v/t61.24694-24/255572396_936575797019649_6959774590794396536_n.jpg?ccb=11-4&oh=e30d1035b3293210adc7ea8c2923d15b&oe=627D4EA3" alt="" /> </span>
        <span style={{marginBottom: "10px"}}>Name: Yss Lodu</span>
        <span style={{marginBottom: "10px"}}>Email: yssJhantu@gmail.com</span>
        <span style={{marginBottom: "10px"}}>Phone Number: 2222222222</span>
        <span style={{marginBottom: "10px"}}>Address: Randi Khana, MG Road Delhi 110001</span>
        <Link to="/customer/reviews"><button>My Reviews</button></Link>
      </div>
    </>
  );
}
export default CustomerProfile;
