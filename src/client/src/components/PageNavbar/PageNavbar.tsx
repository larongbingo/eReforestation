import React, { FunctionComponent } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import { AccountNavbarSection } from "./AccountNavbarSection";

export const PageNavbar: FunctionComponent = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">eReforestation</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link>News</Nav.Link>
        </Nav>
        <AccountNavbarSection />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default PageNavbar;
