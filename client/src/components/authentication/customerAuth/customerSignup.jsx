import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(props) {
  const [error, seterror] = React.useState("");

  const navigate = useNavigate();
  const url = "/api/v1/customers/signup/";

  let dataToSend = {};

  const handleChange = (e) => {
    dataToSend[e.target.id] = e.target.value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: url,
      data: dataToSend,
    })
      .then((res) => {
        props.setcustomer(res.data.data.Customer);
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("* Please fill the complete form correctly! ");
        } else alert("Login failed! Please try again later.");
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>
          <label for="name">Username</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="name"
            name="name"
          />

          <label for="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            id="email"
            name="email"
          />

          <label for="mobileNumber">Contact Number</label>
          <input
            onChange={(e) => handleChange(e)}
            type="tel"
            maxLength={10}
            id="mobileNumber"
            name="mobileNumber"
          />
          <label for="address">Address</label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            id="address"
            name="address"
          />

          <label for="password">Password</label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            id="password"
            name="password"
          />
          <label for="passwordConfirm">Confirm Password</label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
          />
        </fieldset>
        <button type="submit">Create Account</button>
        <p style={{ fontSize: "small" }}>
          By creating an account or logging in, you agree to Maid booking's
          terms and conditions and privacy policy.
        </p>
        <hr />
        <p>
          Already have an account?<Link to="/customerLogin"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
