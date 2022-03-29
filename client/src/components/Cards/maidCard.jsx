import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MaidCard(props) {
  return (
    <>
      <Link
        to={`/maidDetails/${props.maid._id}`}
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <h5>Use props.maid to show maids data on card</h5>
      </Link>
    </>
  );
}

export default MaidCard;
