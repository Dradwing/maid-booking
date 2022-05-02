import React from "react";
import Fade from "react-reveal/Fade";
function HowItWorks() {
  return (
    <>
      <div className="howItWorks">
        <div className="wraper">
          <h2 style={{ textAlign: "center", fontWeight: "600" }}>
            How does it Work?
          </h2>
          <Fade left>
            <div className="points">
              <span class="material-icons" style={{ fontSize: "500%" }}>
                person_search
              </span>
              <p
                style={{
                  fontSize: "22px",
                  margin: "15px 0",
                  fontWeight: "600",
                }}
              >
                Search
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                Search maids using our simple Interface. Use filters and sorting
                methods to find maid as per your preference.
              </p>
            </div>
          </Fade>
          <Fade bottom>
            <div className="points">
              <span class="material-icons" style={{ fontSize: "500%" }}>
                fact_check
              </span>
              <p
                style={{
                  fontSize: "22px",
                  margin: "15px 0",
                  fontWeight: "600",
                }}
              >
                Shortlist
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                View the complete profile of available maids and talk to her on
                phone. Shortlist the maid according to your choice.
              </p>
            </div>
          </Fade>
          <Fade right>
            <div className="points">
              <span class="material-icons" style={{ fontSize: "500%" }}>
                check_circle
              </span>
              <p
                style={{
                  fontSize: "22px",
                  margin: "15px 0",
                  fontWeight: "600",
                }}
              >
                Book
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                Provide the required services and starting date for work and
                make payment. After that just relax.
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
