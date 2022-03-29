import React from "react";

function Filters(props) {
  const handleClick = (e) => {
    let newArray = [];
    const arrayOfBoxes = Array.from(
      e.target.parentElement.parentElement.children
    );
    arrayOfBoxes.map((el) => {
      if (el.children[0].checked === true) newArray.push(el.children[0].value);
      return 0;
    });

    const prevObj = { ...props.filters };
    prevObj[e.target.name] = newArray;
    props.setfilters({ prevObj });
  };

  //for price input and rating Average
  const handleInput = (e) => {
    const prevObj = { ...props.filters };
    prevObj[e.target.name] = e.target.value;
    props.setfilters({ prevObj });
  };

  return (
    <>
      <h5>
        show following filters: Services(Cleaning,Cooking,Laundry,Elederly Care,
        Baby Sitting) Price range(2000 to 5000) RatingaAverage (1, 2,3,4,5)
        Gender(Male, Female, Other)
      </h5>
    </>
  );
}

export default Filters;
