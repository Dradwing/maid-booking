import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "./../../Images/Brown Logo.png";

function NNavbar(props) {
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
            {props.maid.name !== undefined ? (
              <Nav>
                <NavDropdown
                  title={props.maid.name}
                  id="collasible-nav-dropdown"
                >
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.1">
                      My Profile
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.2">
                      My Works
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.1">
                      My Reviews
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Log-Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : props.customer.name !== undefined ? (
              <Nav>
                <NavDropdown
                  title={props.customer.name}
                  id="collasible-nav-dropdown"
                >
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.1">
                      My Profile
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.2">
                      My Bookings
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.2">
                      My Reviews
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
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
                    <NavDropdown.Item href="#action/3.1">
                      As Customer
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to="/maidSignup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.2">
                      As Maid
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
                <NavDropdown title="LogIn" id="collasible-nav-dropdown">
                  <Link
                    to="/customerLogin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.1">
                      As Customer
                    </NavDropdown.Item>
                  </Link>
                  <Link
                    to="/maidLogin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <NavDropdown.Item href="#action/3.2">
                      As Maid
                    </NavDropdown.Item>
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
