import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [error, seterror] = React.useState("");
  const navigate = useNavigate();
  const url = "http://localhost:3000/api/v1/customers/login/";

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
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("*" + errormessage);
        } else alert("Login failed! Please try again later.");
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Log-In</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>
          <label for="email">Email</label>
          <input
            onChange={handleChange}
            value={dataToSend.email}
            type="email"
            id="email"
            name="email"
          />

          <label for="password">Password</label>
          <input
            onChange={handleChange}
            value={dataToSend.password}
            type="password"
            id="password"
            name="password"
          />
          <p>
            <Link to="/customer/forgotPassword">Forgot your password?</Link>
          </p>
        </fieldset>

        <button type="submit">Login</button>

        <hr />
        <p>
          Don't have an account?
          <Link to="/customerSignup"> Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
