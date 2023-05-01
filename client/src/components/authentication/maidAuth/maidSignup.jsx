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
  const url = "/api/v1/maids/signup/";

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
    dataToSend[e.target.name] = e.target.value;
  };
  const handleClick = (e) => {
    dataToSend.services = [];
    const arrayOfBoxes = Array.from(
      e.target.parentElement.parentElement.children
    );
    arrayOfBoxes.map((el) => {
      if (el.children[0].checked === true)
        dataToSend.services.push(el.children[0].value);
      return 0;
    });
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
        props.setmaid(res.data.data.Maid);
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
        <h2>Create Account as Maid</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>
          <label for="name">Username</label>
          <input onChange={handleChange} type="text" id="name" name="name" />
          <label for="email">Email</label>
          <input onChange={handleChange} type="email" id="email" name="email" />
          <label for="mobileNumber">Contact Number</label>
          <input
            onChange={handleChange}
            type="tel"
            maxLength={10}
            id="mobileNumber"
            name="mobileNumber"
          />
          <label for="address">Address</label>
          <input
            onChange={handleChange}
            type="text"
            id="address"
            name="address"
          />
          <label for="dob">Date of Birth</label>
          <input
            onChange={handleChange}
            type="date"
            min={new Date(Date.now() - 60 * 365 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10)}
            max={new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)
              .toISOString()
              .slice(0, 10)}
            id="dob"
            name="dob"
          />
          <label>Gender</label>
          <div className="radioGrid">
            <label className="light">
              {" "}
              <input
                type="radio"
                name="gender"
                value="Male"
                id="male"
                onClick={handleChange}
              />
              {"  "}
              Male
            </label>
            <label className="light">
              <input
                type="radio"
                name="gender"
                value="Female"
                id="female"
                onClick={handleChange}
              />{" "}
              Female
            </label>

            <label className="light">
              <input
                type="radio"
                name="gender"
                value="Other"
                id="other"
                onClick={handleChange}
              />{" "}
              Other
            </label>
          </div>
          <label for="aadharNumber">Aadhaar Number</label>
          <input
            onChange={handleChange}
            type="text"
            id="aadhaarNumber"
            name="aadhaarNumber"
            maxLength={12}
          />

          <label>Services you can provide</label>
          <div className="radioGrid">
            <label className="light">
              <input
                type="checkbox"
                name="services"
                value="Cleaning"
                onClick={handleClick}
              />{" "}
              Cleaning
            </label>
            <label className="light">
              <input
                type="checkbox"
                name="services"
                value="Cooking"
                onClick={handleClick}
              />{" "}
              Cooking
            </label>
            <label className="light">
              <input
                type="checkbox"
                name="services"
                value="Laundry"
                onClick={handleClick}
              />{" "}
              Laundry
            </label>
            <label className="light">
              <input
                type="checkbox"
                name="services"
                value="Elederly Care"
                onClick={handleClick}
              />{" "}
              Elderly Care
            </label>
            <label className="light">
              <input
                type="checkbox"
                name="services"
                value="Baby Sitting"
                onClick={handleClick}
              />{" "}
              Baby Sitting
            </label>
          </div>
          <label for="price">Choose monthly price per service(in rupees)</label>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            min={2000}
            max={5000}
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

          <label for="radius">
            How far from your addess you are ready to work(in KM)
          </label>
          <input
            type="number"
            name="radius"
            onChange={handleChange}
            min={1}
            max={30}
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
        <button type="submit">{state}</button>
        <p style={{ fontSize: "small" }}>
          By creating an account or logging in, you agree to Maid booking's{" "}
          <a href="#">terms and conditions</a> and{" "}
          <a href="#">privacy policy</a>.
        </p>
        <hr />
        <p>
          Already have an account?<Link to="/maidLogin"> Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
