import React, { FunctionComponent } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { AccountNavbarSection } from "./AccountNavbarSection";

export const PageNavbar: FunctionComponent = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">eReforestation</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="About" id="about-dropdown">
            <NavDropdown.Item href="/about/us">About Us</NavDropdown.Item>
            <NavDropdown.Item href="/about/achievements">Achievements</NavDropdown.Item>
            <NavDropdown.Item href="/about/affiliations">Affiliations</NavDropdown.Item>
            <NavDropdown.Item href="/about/faqs">FAQs</NavDropdown.Item>
            <NavDropdown.Item href="/about/contacts">Contacts</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Media" id="news-dropdown">
            <NavDropdown.Item href="/news">News and Announcements</NavDropdown.Item>
            <NavDropdown.Item href="/gallery">Gallery</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Services" id="services-dropdown">
            <NavDropdown.Item href="/volunteering">Volunteer</NavDropdown.Item>
            <NavDropdown.Item href="/events">Reforestation Events</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <AccountNavbarSection />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default PageNavbar;
