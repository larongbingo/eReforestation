import React, { FunctionComponent, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import { IUserDetails } from "../../../../interfaces/models/IUserDetails";
import { APIS_ENDPOINTS } from "../../config/endpoints";
import { logIn, storeSessionKey,  } from "../../libs/session";

import { createUserAccount, createUserDetails, createContactPerson, createUserAccountWithUserDetails } from "./registerFetches";
import { IContactPerson } from "../../../../interfaces/models/IContactPerson";

// TODO: Add validations
export const Register: FunctionComponent = () => {

  const [isRegistered, setIsRegistered]= useState(false);

  // Credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // User Details
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDOB] = useState("");

  // Emergency Contact Person
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactMiddleName, setContactMiddleName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");
  const [contactEmailAddress, setContactEmailAddress] = useState("");

//#region User Details
  const getUserDetailsData: () => IUserDetails = () => ({
    firstName,
    middleName,
    lastName,
    address,
    emailAddress,
    phoneNumber,
    // @ts-ignore
    dateOfBirth,
  });

  const getContactPersonData: () => IContactPerson = () => ({
    firstName: contactFirstName,
    middleName: contactMiddleName,
    lastName: contactLastName,
    address: contactAddress,
    phoneNumber: contactPhoneNumber,
    emailAddress: contactEmailAddress,
  });
//#endregion

  const submitButtonHandler = async (e: any) => {
    e.preventDefault();
    const userDetails: IUserDetails = getUserDetailsData();
    const contactPersonDetails: IContactPerson = getContactPersonData();

    const accountRes = await createUserAccountWithUserDetails({...userDetails, username, password});
    const account = await accountRes.json();

    if (account.userId) {
      const loginRes = await logIn(username, password);
      const login = await loginRes.json();
      storeSessionKey(login.token)

      if (login.token) {
        const contactPersonRes = await createContactPerson(contactPersonDetails);
        const contactPerson = await contactPersonRes.json();

        if (contactPerson.contactPersonDetails) {
          window.location.replace("/");
          setIsRegistered(true);
        }
      }
    }
  };

  return (
    <Container>
      <Form>
        <h2>Account Credentials</h2>

        <Form.Group controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter email" onChange={(e: any) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={(e: any) => setPassword(e.target.value)} />
        </Form.Group>

        <hr/>
        <h2>Personal Details</h2>

        <Row>
          <Col sm={12} md={4}>
            <Form.Group controlId="FirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First Name" onChange={(e: any) => setFirstName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm={12} md={4}>
            <Form.Group controlId="MiddleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Middle Name" onChange={(e: any) => setMiddleName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm={12} md={4}>
            <Form.Group controlId="LastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last Name" onChange={(e: any) => setLastName(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" onChange={(e: any) => setDOB(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter Address" onChange={(e: any) => setAddress(e.target.value)} />
        </Form.Group>
        <Row>
          <Col sm={12} md={6}>
            <Form.Group controlId="EmailAddress">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email Address" onChange={(e: any) => setEmail(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group controlId="PhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone Number" onChange={(e: any) => setPhoneNumber(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <hr/>
        <h2>Emergency Contact Person</h2>

        <Row>
          <Col sm={12} md={4}>
            <Form.Group controlId="ContactFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Contact's First Name" onChange={(e: any) => setContactFirstName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm={12} md={4}>
            <Form.Group controlId="ContactMiddleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Contact's Middle Name" onChange={(e: any) => setContactMiddleName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm={12} md={4}>
            <Form.Group controlId="ContactLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Contact's Last Name" onChange={(e: any) => setContactLastName(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="ContactAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Enter Contact's Address" onChange={(e: any) => setContactAddress(e.target.value)} />
        </Form.Group>

        <Row>
          <Col sm={12} md={6}>
            <Form.Group controlId="ContactEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Contact's Email Address" onChange={(e: any) => setContactEmailAddress(e.target.value)} />
            </Form.Group>
          </Col>
          <Col sm={12} md={6}>
            <Form.Group controlId="ContactPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Contact's Phone Number" onChange={(e: any) => setContactPhoneNumber(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button type="submit" onSubmit={submitButtonHandler} onClick={submitButtonHandler} block>Register</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
};
