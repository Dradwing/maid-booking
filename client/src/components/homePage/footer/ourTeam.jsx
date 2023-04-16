import React from "react";
import { FaHandPointRight } from "react-icons/fa";
function OurTeam() {
  return (
    <>
      <div className="ourTeam">
        <h3 style={{ fontWeight: "bolder" }}>About Me</h3>
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
      </div>
    </>
  );
}
export default OurTeam;
