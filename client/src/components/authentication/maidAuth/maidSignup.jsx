import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup(props) {
  const [error, seterror] = React.useState("");

  const navigate = useNavigate();
  const url = "/api/v1/maids/signup/";

  let dataToSend = {};

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
    axios({
      method: "POST",
      url: url,
      data: dataToSend,
    })
      .then((res) => {
        props.setmaid(res.data.data.maid);
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("* Please fill the complete form correctly!");
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
