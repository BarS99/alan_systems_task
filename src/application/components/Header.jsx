import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="secondary" variant="dark">
      <Container className="container--sm">
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          ALAN SYSTEMS
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="upload">
            Upload
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
