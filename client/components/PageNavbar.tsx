import React, { FunctionComponent } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";

export const PageNavbar: FunctionComponent = () => 
<Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="/">eReforestation</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
        <Link href="/events" passHref><Nav.Link>Events</Nav.Link></Link>
        <Link href="/about" passHref><Nav.Link>About Us</Nav.Link></Link>
      </Nav>
      <Nav>
        <Link href="/login" passHref><Nav.Link>Log In</Nav.Link></Link>
        <Link href="/register" passHref><Nav.Link>Register</Nav.Link></Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>;

export default PageNavbar;
