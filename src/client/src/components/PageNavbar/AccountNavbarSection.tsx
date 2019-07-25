import React, { FunctionComponent } from "react";
import { Nav } from "react-bootstrap";

import { getSessionKey } from "../../libs/session";

export const AccountNavbarSection: FunctionComponent = () => {
  if (getSessionKey()) {
    return <AuthenticatedLinks />
  }
  
  return <DefaultLinks />;
};

const AuthenticatedLinks: FunctionComponent = () => (
  <Nav>
    <Nav.Link href="/logout">Log Out</Nav.Link>
    <Nav.Link href="/profile">Account</Nav.Link>
  </Nav>
);

const DefaultLinks: FunctionComponent = () => (
  <Nav>
    <Nav.Link href="/login">Log In</Nav.Link>
    <Nav.Link href="/register">Register</Nav.Link>
  </Nav>
);
