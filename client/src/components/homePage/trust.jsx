import React from "react";
import Fade from "react-reveal/Fade";
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
            on maid-booking.herokuapp.com
          </p>
          <div className="wraper">
            <div className="points">
              <img
                src="https://www.bookmybai.com/images/Identity-check.png"
                alt="Not Available"
              ></img>
              <p>Identity Check</p>
            </div>
            <div className="points">
              <img
                src="https://www.bookmybai.com/images/Criminal-record-check.png"
                alt="Not Available"
              ></img>
              <p>Document Verification</p>
            </div>
            <div className="points">
              <img
                src="https://www.bookmybai.com/images/In-person-interview.png"
                alt="Not Available"
              ></img>
              <p>In-person Interview</p>
            </div>
            <div className="points">
              <img
                src="https://www.bookmybai.com/images/Training-session.png"
                alt="Not Available"
              ></img>
              <p>Training Session</p>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}

export default Trust;
