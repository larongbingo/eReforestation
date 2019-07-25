import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import { IUserDetails } from "../../../interfaces/models/IUserDetails";
import { IContactPerson } from "../../../interfaces/models/IContactPerson";
import { ContactPerson } from "../components/profile/ContactPerson";
import { UserDetails } from "../components/profile/UserDetails";

function getUserDetails(): {details: IUserDetails, contact: IContactPerson} {
  // TODO: Implement this
  return {
    details: {
      firstName: "Testing",
      middleName: "Test",
      lastName: "Testinium",
      dateOfBirth: new Date("05/29/1998"),
      address: "Testing Drive, Testing",
      phoneNumber: "69696969696969",
      emailAddress: "testing@test.test"
    },
    contact: {
      firstName: "Require",
      middleName: "Requinium",
      lastName: "Req",
      address: "Requisite Drive, Testing",
      phoneNumber: "420420420420420420",
      emailAddress: "req@require.req",
    },
  }
}

export const ProfilePage: FunctionComponent = () => {
  const info = getUserDetails();

  return (  
    <Container>
      <UserDetails userDetails={info.details} />
      <ContactPerson contactPerson={info.contact} />
    </Container>
  );
};
