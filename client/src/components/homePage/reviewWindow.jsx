import React from "react";
import StarRatings from "react-star-ratings";
import { ImCross } from "react-icons/im";
import axios from "axios";

function ReviewWindow(props) {
  const [rating, setrating] = React.useState(0);
  const [review, setreview] = React.useState("");
  const [state, setstate] = React.useState("Add Review");

  const handleClick = (e) => {
    if (e.target.className === "hideBackground") {
      props.settoggle(false);
    }
  };

  const handleSubmit = () => {
    if (rating === 0 || review === "") {
      alert("Please provide both rating and review to create a feedback! ");
      return;
    }
    setstate("Adding...");
    axios({
      method: "POST",
      url: `/api/v1/reviews/createReview/${props.maid._id}`,
      data: { rating, review },
    })
      .then((res) => {
        setstate("Added successfully ✔ ");
        props.settoggle(false);
      })
      .catch((err) => {
        setstate("Could not add review. Review already exists");
        console.log("Review error:" + err);
      });
  };
  return (
    <>
      {props.toggle ? (
        <div className="hideBackground" onClick={handleClick}>
          <div className="reviewWindow">
            <ImCross
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "30px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                props.settoggle(false);
              }}
            />
            <img
              src="https://maid-booking.onrender.com/api/v1/maids/images/defaultMaid.jpg"
              alt="Not Available"
              style={{ width: "35%", borderRadius: "50%" }}
            ></img>

            <p>Sunita Sharma</p>
            <StarRatings
              rating={rating}
              numberOfStars={5}
              name="rating"
              starEmptyColor="white"
              starHoverColor="gold"
              starRatedColor="gold"
              changeRating={(r) => {
                setrating(r);
              }}
            />
            <textarea
              placeholder="Write your review here..."
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                padding: "10px",
                resize: "vertical",
              }}
              onChange={(e) => {
                setreview(e.target.value.trim());
              }}
              maxLength="200"
            ></textarea>
            <button style={{ margin: "0" }} onClick={handleSubmit}>
              {state}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ReviewWindow;
