import React from "react";
import Fade from "react-reveal/Fade";
import IdCheck from "./../../Images/Identity-check.png";
import Training from "./../../Images/Training-session.png";
import Interview from "./../../Images/In-person-interview.png";
import DocCheck from "./../../Images/Criminal-record-check.png";

function Trust() {
  return (
    <>
      <Fade left>
        <div className="trust">
          <h1
            style={{
              textAlign: "center",
              fontWeight: "580",
              padding: "35px 0 45px 0",
            }}
          >
            We're big on trust & security.
          </h1>
          <p style={{ margin: 0 }}>
            Maids go through an extensive vetting process before they are listed
            on maid-booking.onrender.com
          </p>
          <div className="wraper">
            <div className="points">
              <img src={IdCheck} alt="Not Available"></img>
              <p>Identity Check</p>
            </div>
            <div className="points">
              <img src={DocCheck} alt="Not Available"></img>
              <p>Document Verification</p>
            </div>
            <div className="points">
              <img src={Interview} alt="Not Available"></img>
              <p>In-person Interview</p>
            </div>
            <div className="points">
              <img src={Training} alt="Not Available"></img>
              <p>Training Session</p>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default Trust;
