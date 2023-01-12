import React from "react";
import axios from "axios";

function ContactForm() {
  const [error, seterror] = React.useState("");
  const url = "/contactUs";
  const [data, setdata] = React.useState({});
  const [state, setstate] = React.useState("Send Message");

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setdata(newData);
  };
  const sendData = (e) => {
    e.preventDefault();
    setstate("Sending...");
    axios({ method: "POST", url: url, data: data })
      .then((res) => {
        seterror(res.data.message);
        setstate("Send Message");
      })
      .catch((err) => {
        setstate("Send Message");
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
              name="email"
              id="email"
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
          <button type="submit">{state}</button>
        </form>
      </div>
    </>
  );
}
export default ContactForm;
