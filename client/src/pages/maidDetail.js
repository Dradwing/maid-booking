import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Loader from "react-spinners";
import { css } from "@emotion/react";
import BookingForm from "../components/maidDetailPage/bookingForm";
import Reviews from "../components/maidDetailPage/reviews";
import Fade from "react-reveal/Fade";
import { useLocation } from "react-router-dom";
function MaidDetail(props) {
  const override = css`
    position: absolute;
    left: 30%;
    top: 45%;
  `;
  let stateFromParent = useLocation();
  const [loading, setloading] = React.useState(true);
  const [maidDetail, setmaidDetail] = React.useState({ address: "loading..." });
  const [age, setage] = React.useState(18);
  const url = `/api/v1/maids/maid/${useParams().maidId}`;

  React.useEffect(() => {
    axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        setloading(false);
        setmaidDetail(res.data.Maid, () => {
          let dob = maidDetail.dob.split("T")[0];
          var diff_ms = Date.now() - new Date(dob).getTime();
          var age_date = new Date(diff_ms);

          setage(Math.abs(age_date.getUTCFullYear() - 1970));
        });
      })
      .catch((err) => {
        setloading(false);
        //error page;
        console.log(err);
      });
  }, []); // eslint-disable-line

  return (
    <>
      <Loader.BarLoader
        color="gray"
        loading={loading}
        css={override}
        size={80}
      />

      {/*complete details of maid here including reviews with a book now button*/}
      <div className="maidDetailPage">
        <h1
          style={{
            textAlign: "center",
            color: "Brown",
            textTransform: "capitalize",
            fontWeight: "bolder",
          }}
        >
          {maidDetail.name}
        </h1>
        <BookingForm maid={maidDetail} customer={props.customer} />
        <div className="maidBioData">
          <Fade left>
            <img src={maidDetail.photo} alt="Not available" />
          </Fade>
          <Fade right>
            <div className="maidData">
              <p>Email: {maidDetail.email}</p>
              <p>Mobile Number: {maidDetail.mobileNumber}</p>
              <p>Address: {maidDetail.address.toString()}</p>
              <p>
                Distance From you:{" "}
                {Math.floor(stateFromParent.state.distance / 1000)} KM
              </p>

              <p>Age: {age} years</p>
              <p>Gender: {maidDetail.gender}</p>
              <p>Aadhaar Number: {maidDetail.aadhaarNumber}</p>
              <p>Experience: {maidDetail.experience} years</p>
            </div>
          </Fade>
        </div>

        <Reviews maid={maidDetail} />
      </div>
    </>
  );
}

export default MaidDetail;
