import React from "react";
import axios from "axios";

function ContactForm() {
  const [error, seterror] = React.useState("");
  const url = "http://localhost:3000/contactUs";
  const [data, setdata] = React.useState({});

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setdata(newData);
  };
  const sendData = (e) => {
    e.preventDefault();
    axios({ method: "POST", url: url, data: data })
      .then((res) => {
        seterror(res.data.message);
      })
      .catch((err) => {
        return seterror("* Message could not be send");
      });
  };
  return (
    <>
      <div className="contactForm">
        <form onSubmit={(e) => sendData(e)}>
          <fieldset>
            <label for="name">Name</label>
            <input
              onChange={(e) => handleChange(e)}
              value={data.name}
              type="text"
              id="name"
              name="name"
              placeholder="enter your name..."
            />
            <label for="email">Email</label>
            <input
              onChange={(e) => handleChange(e)}
              value={data.email}
              type="email"
              id="email"
              name="email"
              placeholder="enter your email id..."
            />
            <label for="confirmNewPassword">Message</label>
            <textarea
              onChange={(e) => handleChange(e)}
              value={data.message}
              id="message"
              name="message"
              placeholder="enter your message here..."
              style={{ margin: "0" }}
            />
          </fieldset>
          <p style={{ color: "white", margin: "0" }}>{error}</p>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </>
  );
}
export default ContactForm;
