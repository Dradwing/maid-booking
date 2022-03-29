import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NNavbar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Maid Booking</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              {" "}
              <Link
                to="/maidSignup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Maid Signup
              </Link>
            </Nav.Link>
            <Nav.Link>
              {" "}
              <Link
                to="/customerSignup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Customer Signup
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/maidLogin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Maid Login
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/customerLogin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Customer Login
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default NNavbar;
