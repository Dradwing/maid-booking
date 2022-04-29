import React from "react";

function ProvidedServices() {
  return (
    <>
      <div className="providedServices">
        <div className="wraper">
          <h2 style={{ textAlign: "center", fontWeight: "600" }}>
            What we offer?
          </h2>
          <div className="points">
            <img src="" alt="Not available"></img>
            <p
              style={{
                fontSize: "30px",
                margin: "15px 0",
                fontWeight: "600",
                marginBottom: "0",
              }}
            >
              Cooking
            </p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Homecooks who cook delightful meals which gives the warmth and
              comfort of home.
            </p>
            <p className="btn">Book Now</p>
          </div>
          <div className="points">
            <img src="" alt="Not available"></img>
            <p
              style={{
                fontSize: "30px",
                margin: "15px 0",
                fontWeight: "600",
                marginBottom: "0",
              }}
            >
              Cleaning
            </p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              We strictly believe that cleanliness is next to godliness and we
              mean it.
            </p>
            <p className="btn">Book Now</p>
          </div>
          <div className="points">
            <img src="" alt="Not available"></img>
            <p
              style={{
                fontSize: "30px",
                margin: "15px 0",
                fontWeight: "600",
                marginBottom: "0",
              }}
            >
              Laundry
            </p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Launders, who are ultimate in professional care, will keep your
              cloths new forever.
            </p>
            <p className="btn">Book Now</p>
          </div>
          <div className="wraper" style={{ maxWidth: "800px" }}>
            <div
              className="points"
              style={{ width: "46%", margin: "10px 2% 10px 2%" }}
            >
              <img src="" alt="Not available"></img>
              <p
                style={{
                  fontSize: "30px",
                  margin: "15px 0",
                  fontWeight: "600",
                  marginBottom: "0",
                }}
              >
                Baby Sitting
              </p>
              <p style={{ fontSize: "14px", margin: 0 }}>
                {" "}
                Super speedy, super simple, super sensible maids! Sweet Dreams
                for You and Your Child.
              </p>
              <p className="btn">Book Now</p>
            </div>
            <div className="points" style={{ width: "46%" }}>
              <img src="" alt="Not available"></img>
              <p
                style={{
                  fontSize: "30px",
                  margin: "15px 0",
                  fontWeight: "600",
                  marginBottom: "0",
                }}
              >
                Elderly Care
              </p>
              <p style={{ fontSize: "14px", margin: 0, padding: "0 2px" }}>
                Our approach is the good life for seniors citizens and we are
                dedicate to it.
              </p>
              <p className="btn">Book Now</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProvidedServices;
