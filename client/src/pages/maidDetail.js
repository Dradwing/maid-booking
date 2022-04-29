import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Loader from "react-spinners";
import { css } from "@emotion/react";
import BookingForm from "../components/maidDetailPage/bookingForm";
import Reviews from "../components/maidDetailPage/reviews";

function MaidDetail() {
  const override = css`
    position: absolute;
    left: 30%;
    top: 45%;
  `;
  const [loading, setloading] = React.useState(true);
  const [maidDetail, setmaidDetail] = React.useState({ address: "loading..." });
  const [age, setage] = React.useState(18);
  const url = `http://localhost:3000/api/v1/maids/maid/${useParams().maidId}`;

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
        //setloading(false);
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
        <BookingForm maid={maidDetail} />
        <div className="maidBioData">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AgT0E9ApcLRITddl1Vxtk_zFkg0WrUC7Wg&usqp=CAU"
            alt="Not available"
          />
          <div className="maidData">
            <p>Email: {maidDetail.email}</p>
            <p>Mobile Number: {maidDetail.mobileNumber}</p>
            <p>Address: {maidDetail.address.toString()}</p>
            <p>Age: {age} years</p>
            <p>Gender: {maidDetail.gender}</p>
            <p>Aadhaar Number: {maidDetail.aadhaarNumber}</p>
            <p>Experience: {maidDetail.experience} years</p>
          </div>
        </div>
        <Reviews maid={maidDetail} />
      </div>
    </>
  );
}

export default MaidDetail;
