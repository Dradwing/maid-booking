import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Checkout(props) {
  let maid = useLocation().state.maid;

  let services = [];
  let startingDate;

  const stripe = loadStripe(
    "pk_test_51KcucRSDevBPU9EzckceCZBrURlXRK2A0GuoFtlkj8FFIvK8t4KqjfahiCnGo5XoSLAEeKYdcUcJHzciWd9LI4Dx005zmvHH6u"
  );
  const url = `/api/v1/bookings/checkout-session/${maid._id}`;

  const handleClick = async () => {
    try {
      const session = await axios({
        method: "POST",
        url: url,
        data: { startingDate, services },
      });
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (err) {
      console.log(err.response);
      alert("Could not complete the payment! Please try again later");
    }
  };

  return (
    <div>
      Ask for starting date and services and show Total price.
      <button onClick={handleClick}> Click here to Pay</button>
    </div>
  );
}

export default Checkout;
