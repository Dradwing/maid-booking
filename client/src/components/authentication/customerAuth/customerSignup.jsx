import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import axios from "axios";

function Signup(props) {
  const [error, seterror] = React.useState("");
  const [state, setstate] = React.useState("Create Account");
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
    error: false,
  });

  const navigate = useNavigate();
  const url = "/api/v1/customers/signup/";

  let dataToSend = {};

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      seterror("* Geolocation is not supported by your browser.");
      return;
    }
    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: true,
      });
    };

    const error = (error) => {
      seterror(error);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  const handleChange = (e) => {
    dataToSend[e.target.id] = e.target.value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setstate("Creating...");
    dataToSend["location"] = [location.longitude, location.latitude];
    axios({
      method: "POST",
      url: url,
      data: dataToSend,
    })
      .then((res) => {
        props.setcustomer(res.data.data.Customer);
        setstate("Create Account");
        navigate("/");
      })
      .catch((err) => {
        setstate("Create Account");
        if (err.response) {
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

          <label for="location">Give you current location</label>
          <div className="location" onClick={getCurrentLocation}>
            <label for="photo" className="photoLabel">
              Locate Me
              <AiFillCheckCircle
                style={{ display: location.error ? "inline-block" : "none" }}
              />
            </label>
          </div>

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
        <button type="submit">{state}</button>
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
