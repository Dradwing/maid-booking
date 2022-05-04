import React from "react";
import axios from "axios";

function EditCustomerProfile(props) {
  const [error, seterror] = React.useState("");
  const [passError, setpassError] = React.useState("");
  const [photo, setphoto] = React.useState(undefined);
  const urlToUpdateData = "/api/v1/customers/updateMe/";
  const urlToUpdatePassword = "api/v1/customers/updatePassword";

  let dataToSend = {};
  let passwordData = {};

  const changePhoto = (e) => {
    setphoto(e.target.files[0]);
  };
  const handleDataChange = (e) => {
    dataToSend[e.target.name] = e.target.value;
  };
  const handlePassword = (e) => {
    passwordData[e.target.name] = e.target.value;
  };

  const uploadPhoto = () => {
    const formData = new FormData();

    formData.append("photo", photo);
    axios({
      method: "PATCH",
      url: urlToUpdateData,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        props.setmaid(res.data.Maid);

        seterror("Image updated successfully! ");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("*" + errormessage);
        } else alert("Could not update image! Please try again later.");
      });
  };
  const updateData = (e) => {
    e.preventDefault();

    axios({
      method: "PATCH",
      url: urlToUpdateData,
      data: dataToSend,
    })
      .then((res) => {
        props.setcustomer(res.data.Customer);
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
      <div className="editProfile">
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <img src={props.customer.photo} alt="Not available"></img>
          <label
            for="uploadPhoto"
            style={{ display: "block", textAlign: "center" }}
          >
            Change Photo
          </label>
          <input type="file" id="photo" name="photo" onChange={changePhoto} />
          {photo !== undefined ? (
            <p
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={uploadPhoto}
            >
              Upload
            </p>
          ) : (
            ""
          )}
        </div>
        <form onSubmit={updateData}>
          <fieldset>
            <p style={{ color: "white" }}>{error}</p>
            <label for="name">Name</label>
            <input
              onChange={(e) => handleDataChange(e)}
              type="text"
              id="name"
              name="name"
              placeholder={props.customer.name}
            />

            <label for="email">Email</label>
            <input
              onChange={(e) => handleDataChange(e)}
              type="email"
              id="email"
              name="email"
              placeholder={props.customer.email}
            />

            <label for="mobileNumber">Contact Number</label>
            <input
              onChange={(e) => handleDataChange(e)}
              type="tel"
              maxLength={10}
              id="mobileNumber"
              name="mobileNumber"
              placeholder={props.customer.mobileNumber}
            />
            <label for="address">Address</label>
            <input
              onChange={(e) => handleDataChange(e)}
              type="text"
              id="address"
              name="address"
              placeholder={props.customer.address[0].toString()}
            />
          </fieldset>
          <button type="submit">Save Changes</button>
        </form>
        <form onSubmit={updatePassword}>
          <fieldset>
            <p style={{ color: "white" }}>{passError}</p>
            <label for="password">Password</label>
            <input
              onChange={(e) => handlePassword(e)}
              type="password"
              id="password"
              name="password"
            />
            <label for="password">New Password</label>
            <input
              onChange={(e) => handlePassword(e)}
              type="password"
              id="newPassword"
              name="newPassword"
            />
            <label for="passwordConfirm">Confirm New Password</label>
            <input
              onChange={(e) => handlePassword(e)}
              type="password"
              id="newPasswordConfirm"
              name="newPasswordConfirm"
            />
          </fieldset>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </>
  );
}

export default EditCustomerProfile;
