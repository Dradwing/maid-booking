import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CustomerForgotPassword() {
  const [error, seterror] = React.useState("");
  const url = "/api/v1/customers/forgotPassword/";
  const [state, setstate] = React.useState("Send Request");

  let dataToSend = {};

  const handleChange = (e) => {
    dataToSend.email = e.target.value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setstate("Sending...");
    axios({ method: "POST", url: url, data: dataToSend })
      .then((res) => {
        let errormessage = res.data.message;
        seterror(errormessage);
        setstate("Send Request");
      })
      .catch((err) => {
        setstate("Send Request");
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("*" + errormessage);
        } else alert("Email could not be send! Please try again later.");
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <fieldset>
          <p
            style={{ color: error.startsWith("*") ? "crimson" : "forestgreen" }}
          >
            {error}
          </p>
          <label for="email">Email</label>
          <input onChange={handleChange} type="email" id="email" name="email" />
          <p
            style={{ color: "#8d8894", fontSize: "small", marginTop: "-10px" }}
          >
            We'll email you a link to reset your password
          </p>
        </fieldset>
        <button type="submit">{state}</button>

        <hr />
        <p>
          Don't have an account?
          <Link to="/customerSignup"> Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default CustomerForgotPassword;
