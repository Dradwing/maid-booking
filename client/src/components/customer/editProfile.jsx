import React from "react";
import axios from "axios";

function EditCustomerProfile(props) {
  const [error, seterror] = React.useState("");
  const [passError, setpassError] = React.useState("");
  const [photo, setphoto] = React.useState(undefined);
  const [state1, setstate1] = React.useState("Save Changes");
  const [state2, setstate2] = React.useState("Update Password");
  const [state3, setstate3] = React.useState("Upload");

  const urlToUpdateData = "/api/v1/customers/updateMe/";
  const urlToUpdatePassword = "/api/v1/customers/updatePassword";

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
    setstate3("Uploading...");
    axios({
      method: "PATCH",
      url: urlToUpdateData,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        props.setcustomer(res.data.Customer);

        seterror("Image updated successfully! ");
        setstate3("Upload");
      })
      .catch((err) => {
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("* File is not image or image size is too large! ");
        } else alert("Could not update image! Please try again later.");
        setstate3("Upload");
      });
  };
  const updateData = (e) => {
    e.preventDefault();
    setstate1("Saving...");
    axios({
      method: "PATCH",
      url: urlToUpdateData,
      data: dataToSend,
    })
      .then((res) => {
        props.setcustomer(res.data.Customer);
        seterror("Data updated successfully! ");
        setstate1("Save Changes");
      })
      .catch((err) => {
        setstate1("Save Changes");
        if (err.response) {
          let errormessage = err.response.data.message;
          seterror("* Please provide the correct data! ");
        } else alert("Could not update data! Please try again later.");
      });
  };
  const updatePassword = (e) => {
    e.preventDefault();
    setstate2("Updating...");
    axios({
      method: "PATCH",
      url: urlToUpdatePassword,
      data: passwordData,
    })
      .then((res) => {
        setpassError("Password updated successfully! ");
        setstate2("Update Password");
      })
      .catch((err) => {
        setstate2("Update Password");
        if (err.response) {
          let errormessage = err.response.data.message;
          setpassError("* Please fill the form correctly");
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
          <label for="photo" className="photoLabel">
            Change Photo
          </label>
          <input type="file" id="photo" name="photo" onChange={changePhoto} />
          {photo !== undefined ? (
            <p
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={uploadPhoto}
            >
              {state3}
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
          <button type="submit">{state1}</button>
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
          <button type="submit">{state2}</button>
        </form>
      </div>
    </>
  );
}

export default EditCustomerProfile;
