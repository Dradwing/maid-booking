import React from "react";

function Filters(props) {
  const [priceValue, setpriceValue] = React.useState(5000);
  const [rating, setrating] = React.useState(1);

  // for checkboxes
  const handleClick = (e) => {
    let newString = "";
    const arrayOfBoxes = Array.from(
      e.target.parentElement.parentElement.children
    );
    arrayOfBoxes.map((el) => {
      if (el.nodeName === "LABEL" && el.children[0].checked === true)
        newString +=
          newString.length === 0
            ? el.children[0].value
            : "," + el.children[0].value;
      return 0;
    });

    const prevObj = { ...props.filters };
    if (newString.length === 0) delete prevObj[e.target.name];
    else prevObj[e.target.name] = newString;

    props.setfilters(prevObj);
  };

  //for price input and rating Average
  const handleInput = (e) => {
    const prevObj = { ...props.filters };
    prevObj[e.target.name] = e.target.value;
    props.setfilters(prevObj);
  };

  return (
    <>
      {/*
        show following filters: Services(Cleaning,Cooking,Laundry,Elederly Care,
        Baby Sitting) Price range(2000 to 5000) RatingaAverage (1, 2,3,4,5)
        Gender(Male, Female, Other)*/}
      <div className="filters">
        <label> Services </label>
        <br />
        <br />
        <div className="checkboxes">
          <label className="light">
            <input
              type="checkbox"
              name="services"
              value="Cleaning"
              onClick={handleClick}
            />{" "}
            Cleaning
          </label>
          <br />
          <label className="light">
            <input
              type="checkbox"
              name="services"
              value="Cooking"
              onClick={handleClick}
            />{" "}
            Cooking
          </label>
          <br />
          <label className="light">
            <input
              type="checkbox"
              name="services"
              value="Laundry"
              onClick={handleClick}
            />{" "}
            Laundry
          </label>
          <br />
          <label className="light">
            <input
              type="checkbox"
              name="services"
              value="Elederly Care"
              onClick={handleClick}
            />{" "}
            Elderly Care
          </label>
          <br />
          <label className="light">
            <input
              type="checkbox"
              name="services"
              value="Baby Sitting"
              onClick={handleClick}
            />{" "}
            Baby Sitting
          </label>
        </div>
        <hr />
        <label>Price Range(2000-{priceValue})</label>
        <br />
        <input
          type="range"
          min="2000"
          max="5000"
          name="price[lte]"
          step="500"
          value={priceValue}
          onChange={handleInput}
          onInput={(e) => {
            setpriceValue(e.target.value);
          }}
        />
        <hr />
        <label>Gender</label>
        <br />
        <br />
        <div className="checkboxes">
          <label className="light">
            <input
              type="checkbox"
              name="gender"
              value="Male"
              onClick={handleClick}
            />{" "}
            Male
          </label>
          <br />
          <label className="light">
            <input
              type="checkbox"
              name="gender"
              value="Female"
              onClick={handleClick}
            />{" "}
            Female
          </label>
          <br />
          <label className="light">
            <input
              type="checkbox"
              name="gender"
              value="Other"
              onClick={handleClick}
            />{" "}
            Other
          </label>
        </div>
        <hr />
        <label>Rating Range({rating}-5)</label>
        <br />
        <input
          type="range"
          min="1"
          max="5"
          name="ratingAverage[gte]"
          step="0.5"
          value={rating}
          onChange={handleInput}
          onInput={(e) => {
            setrating(e.target.value);
          }}
        />
      </div>
    </>
  );
}

export default Filters;
