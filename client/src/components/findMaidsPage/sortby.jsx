import React from "react";
import { InputGroup, Dropdown, DropdownButton, Button } from "react-bootstrap";

function SortBy(props) {
  const handleClick = (e, value) => {
    const prevObj = { ...props.filters };
    prevObj.sortby = value;
    props.setfilters(prevObj);
  };
  return (
    <>
      {/*show following sorting methods: rating,experience, age, price;*/}
      <div className="sortby1" style={{ marginTop: "20px" }}>
        <p
          style={{
            fontSize: "normal",
            fontWeight: "bold",
            color: "black",
            display: "inline",
            margin: 0,
            marginRight: "10px",
          }}
        >
          Sort By
        </p>
        <InputGroup style={{ display: "inline" }}>
          <Button
            variant="outline-secondary"
            id="button-addon1"
            onClick={(e) => handleClick(e, "-ratingAverage")}
          >
            Rating
          </Button>
          <DropdownButton
            variant="outline-secondary"
            title="Experience"
            id="input-group-dropdown-3"
          >
            <Dropdown.Item onClick={(e) => handleClick(e, "-experience")}>
              High to Low
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => handleClick(e, "experience")}>
              Low to High
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title="Age"
            id="input-group-dropdown-4"
          >
            <Dropdown.Item onClick={(e) => handleClick(e, "-dob")}>
              Low to High
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => handleClick(e, "dob")}>
              High to Low
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            variant="outline-secondary"
            title="Price"
            id="input-group-dropdown-4"
          >
            <Dropdown.Item onClick={(e) => handleClick(e, "price")}>
              Low to High
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => handleClick(e, "-price")}>
              High to Low
            </Dropdown.Item>
          </DropdownButton>
        </InputGroup>
      </div>
    </>
  );
}
export default SortBy;
