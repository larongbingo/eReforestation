import React, { FunctionComponent, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import { APIS_ENDPOINTS } from "../config/endpoints";

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
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitButtonHandler = async () => {
    // Submit to create user
    const userRes = await fetch(APIS_ENDPOINTS.user.register.route, {
      method: APIS_ENDPOINTS.user.register.method,
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log(username, password);

    const user = await userRes.json();

    if (user.id) {
      // Login
      const loginRes = await fetch(APIS_ENDPOINTS.auth.login.route, {
        method: APIS_ENDPOINTS.auth.login.method,
        body: JSON.stringify({username, password}),
      });

      const login = await loginRes.json();

      console.log(login);
    }
    console.log(user);
    
    // Submit to create details
  };

  return (
    <Container>
      <Form> 
        <Form.Group controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter email" onChange={(e: any) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" onChange={(e: any) => setPassword(e.target.value)} />
        </Form.Group>
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
        <Row>
          <Col>
            <Button onClick={submitButtonHandler} block>Register</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  )
};
