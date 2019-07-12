import React, { FunctionComponent } from "react";
import { Row, Col } from "react-bootstrap";

import { IUserDetails } from "../../../../interfaces/models/IUserDetails";

export const UserDetails: FunctionComponent<UserDetailsProps> = ({userDetails}) => (
  <>
    <Row>
      <Col>First Name: {userDetails.firstName}</Col>
      <Col>Middle Name: {userDetails.middleName}</Col>
      <Col>Last Name: {userDetails.lastName}</Col>
      <Col>Date of Birth: {userDetails.dateOfBirth.toISOString()}</Col>
    </Row>
    <Row>
      Address: {userDetails.address}
    </Row>
    <Row>
      <Col>Phone Number: {userDetails.phoneNumber}</Col>
      <Col>Email Address: {userDetails.emailAddress}</Col>  
    </Row>
  </>
);

export interface UserDetailsProps {
  userDetails: IUserDetails;
}
