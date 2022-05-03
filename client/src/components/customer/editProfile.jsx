import React from "react";
import axios from "axios";
import CustomerReviews from "./myReviews";

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
      <div className="profile" style={{minHeight: "500px"}}>
        <span style={{marginBottom: "30px"}}> <img src="https://pps.whatsapp.net/v/t61.24694-24/255572396_936575797019649_6959774590794396536_n.jpg?ccb=11-4&oh=e30d1035b3293210adc7ea8c2923d15b&oe=627D4EA3" alt="" /> </span>
        <span style={{marginBottom: "10px"}}>Choose Profile Photo: <input type="file" onChange={() => {}}/></span>
        <span style={{marginBottom: "10px"}}>Name: <input type="text" value="Yss Lode" onChange={() => {}}/></span>
        <span style={{marginBottom: "10px"}}>Email: <input type="email" value="yssgandu@gmail.com" onChange={() => {}}/></span>
        <span style={{marginBottom: "10px"}}>Phone Number: <input type="phone" value="8686868688" onChange={() => {}}/></span>
        <span style={{marginBottom: "10px"}}>Address: <input type="" value="Randi Khana, MG Road Delhi 110001" onChange={() => {}}/></span>
        <button id="update-button">Update Profile</button>
      </div>
    </>
  );
}

export default EditCustomerProfile;
