import React from "react";
import { FaHandPointRight } from "react-icons/fa";
function OurTeam() {
  return (
    <>
      <div className="ourTeam">
        <h3 style={{ fontWeight: "bolder" }}>Our Team</h3>
        <h4>Ashutosh Saini</h4>
        <p>
          <FaHandPointRight /> Backend Developer
        </p>
        <p>
          <FaHandPointRight /> Frontend Developer
        </p>
        <p>
          <FaHandPointRight /> UI/UX Designer
        </p>
        <h4>YSS Siddarth</h4>
        <p>
          <FaHandPointRight /> Frontend Developer
        </p>
        <p>
          <FaHandPointRight /> Tester
        </p>
        <h4>Surya Singh Dosanjh</h4>
        <p>
          <FaHandPointRight /> Frontend Developer
        </p>
      </div>
    </>
  );
}
export default OurTeam;
