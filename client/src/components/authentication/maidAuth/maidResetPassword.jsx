import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function MaidResetPassword(props) {
  const [error, seterror] = React.useState("");
  const navigate = useNavigate();
  const url = `/api/v1/maids/resetPassword/${useParams().token}`;

  let dataToSend = {};

  const handleChange = (e) => (dataToSend[e.target.name] = e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({ method: "PATCH", url: url, data: dataToSend })
      .then((res) => {
        props.setmaid(res.data.data.Maid);
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("* Please fill the complete form correctly! ");
        } else alert("Could not reset Password! Please try again later!");
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <fieldset>
          <p style={{ color: "crimson" }}>{error}</p>

          <label for="password">password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
          />
          <label for="passwordConfirm">Confirm Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
          />
        </fieldset>
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
}

export default MaidResetPassword;
