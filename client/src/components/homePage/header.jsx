import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NNavbar(props) {
  const navigate = useNavigate();
  const logoutMaid = () => {
    axios.get("/api/v1/maids/logout");
    props.setmaid({});
    navigate("/");
  };
  const logoutCustomer = () => {
    axios.get("/api/v1/customers/logout");
    props.setcustomer({});
    navigate("/");
  };

  React.useEffect(() => {
    axios({
      method: "GET",
      url: "/api/v1/customers/me/",
    })
      .then((res) => {
        props.setcustomer(res.data.Customer);
      })
      .catch((err) => {
        console.log("User is not logged In! ");
      });

    axios({
      method: "GET",
      url: "/api/v1/maids/me/",
    })
      .then((res) => {
        props.setmaid(res.data.Maid);
      })
      .catch((err) => {
        console.log("User is not logged In! ");
      });
  }, []); //eslint-disable-line
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "rgb(130,35,35)" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand
            href="/"
            style={{
              fontFamily: "'Ms Madi', sans-serif",
              fontSize: "x-large",
              padding: "0",
            }}
          >
            Maid Booking
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#footer">Our Team</Nav.Link>
              <Nav.Link href="/#footer">Contact Us</Nav.Link>
            </Nav>
            {props.maid !== undefined && props.maid.name !== undefined ? (
              <Nav>
                <NavDropdown
                  title={props.maid.name}
                  id="collasible-nav-dropdown"
                >
                  <Link
                    to="maid/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">My Profile</NavDropdown.Item>
                  </Link>
                  <Link
                    to="maid/bookings"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">My Works</NavDropdown.Item>
                  </Link>
                  <Link
                    to="maid/reviews"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">My Reviews</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#dumy" onClick={logoutMaid}>
                    Log-Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : props.customer !== undefined &&
              props.customer.name !== undefined ? (
              <Nav>
                <NavDropdown
                  title={props.customer.name}
                  id="collasible-nav-dropdown"
                >
                  <Link
                    to="/customer/profile"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">My Profile</NavDropdown.Item>
                  </Link>
                  <Link
                    to="/customer/bookings"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">
                      My Bookings
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to="/customer/reviews"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">My Reviews</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#dumy" onClick={logoutCustomer}>
                    Log-Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <NavDropdown title="SignIn" id="collasible-nav-dropdown">
                  <Link
                    to="/customerSignup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">
                      As Customer
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to="/maidSignup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">As Maid</NavDropdown.Item>
                  </Link>
                </NavDropdown>
                <NavDropdown title="LogIn" id="collasible-nav-dropdown">
                  <Link
                    to="/customerLogin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">
                      As Customer
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to="/maidLogin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#dumy">As Maid</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NNavbar;
