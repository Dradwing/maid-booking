import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import reactCookie from "react-cookie";

function Login(props) {
  const [error, seterror] = React.useState("");
  const [state, setstate] = React.useState("Login");
  const navigate = useNavigate();
  const url = "/api/v1/maids/login/";
  let dataToSend = {};

  const handleChange = (e) => {
    dataToSend[e.target.id] = e.target.value;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setstate("Logging In...");
    axios({
      method: "POST",
      url: url,
      data: dataToSend,
    })
      .then((res) => {
        props.setmaid(res.data.data.Maid);
        setstate("Login");
        navigate("/");
      })
      .catch((err) => {
        setstate("Login");
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("*" + errormessage);
        } else alert("Login failed! Please try again later.");
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Log-In as Maid</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>
          <label for="email">Email</label>
          <input onChange={handleChange} type="email" id="email" name="email" />

          <label for="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
          />
          <p>
            <Link to="/maid/forgotPassword">Forgot your password?</Link>
          </p>
        </fieldset>

        <button type="submit">{state}</button>

        <hr />
        <p>
          Don't have an account?
          <Link to="/maidSingup"> Create an account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
