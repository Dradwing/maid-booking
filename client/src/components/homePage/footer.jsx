import React from "react";
import OurTeam from "./footer/ourTeam";
import ContactUs from "./footer/contactUs";
import ContactForm from "./footer/contactForm";
import Logo from "./../../Images/Brown Logo.png";
function Footer() {
  return (
    <>
      <div className="footer" id="footer">
        <img
          src={Logo}
          alt="Not available"
          style={{ maxWidth: "100%", placeSelf: "center" }}
        ></img>
        <OurTeam></OurTeam>
        <ContactUs></ContactUs>
        <ContactForm></ContactForm>
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "small",
          backgroundColor: "rgb(130, 35, 35)",
          margin: 0,
          color: "white",
        }}
      >
        {" "}
        © 2021 Maid Booking. All rights reserved.
      </p>
    </>
  );
}
export default Footer;
