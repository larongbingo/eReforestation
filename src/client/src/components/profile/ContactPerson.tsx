import React, { FunctionComponent } from "react";
import { Row, Col } from "react-bootstrap";

import { IContactPerson } from "../../../../interfaces/models/IContactPerson";

export const ContactPerson: FunctionComponent<ContactPersonProps> = ({contactPerson}) => (
  <>
    <Row>
      <Col>First Name: {contactPerson.firstName}</Col>
      <Col>Middle Name: {contactPerson.middleName}</Col>
      <Col>Last Name: {contactPerson.lastName}</Col>
    </Row>
    <Row>
      <Col>Address: {contactPerson.address}</Col>
    </Row>
    <Row>
      <Col>Phone Number: {contactPerson.phoneNumber}</Col>
      <Col>Email Address: {contactPerson.emailAddress}</Col>
    </Row>
  </>
);

export interface ContactPersonProps {
  contactPerson: IContactPerson;
}
