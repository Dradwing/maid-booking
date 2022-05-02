import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { BsGenderAmbiguous, BsFillBagCheckFill } from "react-icons/bs";
import Fade from "react-reveal/Fade";
function MaidCard(props) {
  let dob = props.maid.dob.split("T")[0];
  var diff_ms = Date.now() - new Date(dob).getTime();
  var age_date = new Date(diff_ms);

  const age = Math.abs(age_date.getUTCFullYear() - 1970);
  return (
    <>
      <Fade bottom>
        <Link
          to={`/maidDetails/${props.maid._id}`}
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <div className="maidCard">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AgT0E9ApcLRITddl1Vxtk_zFkg0WrUC7Wg&usqp=CAU"
              alt="Not Available"
            />
            <div className="maidInfo">
              <p
                style={{
                  fontWeight: "bolder",
                  fontSize: "x-large",
                  display: "inline-block",
                  textTransform: "capitalize",
                }}
              >
                {props.maid.name}
              </p>
              <p
                style={{
                  display: "inline",
                  float: "right",
                  fontSize: "x-large",
                }}
              >
                {props.maid.ratingAverage}
                <AiFillStar style={{ color: "gold", fontSize: "xx-large" }} />
              </p>
              <p>
                <FaBirthdayCake /> Age: {age} years
              </p>
              <p>
                <BsGenderAmbiguous /> Gender: {props.maid.gender}
              </p>
              <p>
                <BsFillBagCheckFill /> Experience: {props.maid.experience} years
              </p>
              <div className="services">
                {props.maid.services.map((service) => {
                  return (
                    <p
                      style={{
                        padding: "0 5px",
                        backgroundColor: "white",
                        fontWeight: "bolder",
                        color: "brown",
                        borderRadius: "10px",
                      }}
                    >
                      {service}
                    </p>
                  );
                })}
              </div>
              <div className="price">
                <p
                  style={{
                    textAlign: "right",
                    margin: 0,
                    fontWeight: "650",
                    fontSize: "larger",
                    lineHeight: "10px",
                    color: "gold",
                  }}
                >
                  Rs {props.maid.price}
                </p>
                <p
                  style={{ textAlign: "right", margin: 0, fontSize: "smaller" }}
                >
                  per month per service
                </p>
              </div>
            </div>
          </div>
        </Link>
      </Fade>
    </>
  );
}

export default MaidCard;
