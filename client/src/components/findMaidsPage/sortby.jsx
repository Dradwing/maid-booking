import React from "react";

function SortBy(props) {
  const handleChange = (e) => {
    let prevObj = { ...props.filters };
    prevObj[e.target.name] = e.target.value;
    props.setfilters(prevObj);
  };
  return (
    <>
      <h5>show following sorting methods: rating,experience, age, price;</h5>
    </>
  );
}
export default SortBy;
