import React from "react";
import axios from "axios";

//image upload is not done yet

function EditCustomerProfile(props) {
  const [error, seterror] = React.useState("");
  const [passError, setpassError] = React.useState("");

  const urlToUpdateData = "http://localhost:3000/api/v1/customers/updateMe/";
  const urlToUpdatePassword =
    "http://localhost:3000/api/v1/customers/updatePassword";

  let dataToSend = {};
  let passwordData = {};

  const handleData = (e) => {
    dataToSend[e.target.name] = e.target.value;
  };
  const handlePassword = (e) => {
    passwordData[e.target.name] = e.target.value;
  };
  const updateData = (e) => {
    e.preventDefault();
    axios({
      method: "PATCH",
      url: urlToUpdateData,
      data: dataToSend,
    })
      .then((res) => {
        props.setcustomer(res.data.data.Customer);
        seterror("Data updated successfully! ");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("*" + errormessage);
        } else alert("Could not update data! Please try again later.");
      });
  };
  const updatePassword = (e) => {
    e.preventDefault();
    axios({
      method: "PATCH",
      url: urlToUpdatePassword,
      data: passwordData,
    })
      .then((res) => {
        setpassError("Password updated successfully! ");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          setpassError("*" + errormessage);
        } else alert("Could not update password! Please try again later.");
      });
  };
  return (
    <>
      <h3>
        Show customer data and allow to edit and ask newpassword,
        confirmPassword to change password.
      </h3>
    </>
  );
}

export default EditCustomerProfile;
