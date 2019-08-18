import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import { PENRO_CAVITE_CONTACTS } from "../../config/penroCaviteContacts";

export const Contact: FunctionComponent = () => (
  <Container>
    <div>
      <h5>Address</h5>
      <p>{PENRO_CAVITE_CONTACTS.address}</p>
    </div>
    <div>
      <h5>Mobile Numbers</h5>
      <p>{PENRO_CAVITE_CONTACTS.contactNumbers[0]}</p>
    </div>
    <div>
      <h5>Emails</h5>
      { PENRO_CAVITE_CONTACTS.emails.map(email => <p>{email}</p>) }
    </div>
  </Container>
);
