import axios from "axios";
import React from "react";
import MaidCard from "../Cards/maidCard";

function TopRated() {
  const [maids, setmaids] = React.useState([]);
  const url = "/api/v1/maids/top-6-rated/";

  React.useEffect(() => {
    axios({ method: "GET", url: url })
      .then((res) => {
        setmaids(res.data.data.Maids);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="topRated">
        <h2 style={{ textAlign: "center", fontWeight: "600" }}>
          Top Rated Maids
        </h2>
        <p style={{ textAlign: "center", margin: "0", fontSize: "small" }}>
          Have a look at some of our top rated working professionals
        </p>
        <div className="wraper">{maids.map((maid) => createCard(maid))}</div>
      </div>
    </>
  );
}
function createCard(maid) {
  return (
    <>
      <MaidCard maid={maid} />
    </>
  );
}

export default TopRated;
