import React, { FunctionComponent } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

// TODO: Add validations
export const Register: FunctionComponent = () => (
  <Container>
    <Form>
      <Form.Group controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"  placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
      </Form.Group>
      <Row>
        <Col sm={12} md={4}>
          <Form.Group controlId="FirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter First Name" />
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group controlId="MiddleName">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Middle Name" />
          </Form.Group>
        </Col>
        <Col sm={12} md={4}>
          <Form.Group controlId="LastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Last Name" />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="Address">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter Address" />
      </Form.Group>
      <Row>
        <Col sm={12} md={6}>
          <Form.Group controlId="EmailAddress">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email Address" />
          </Form.Group>
        </Col>
        <Col sm={12} md={6}>
          <Form.Group controlId="PhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Enter Phone Number" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button block>Register</Button>
        </Col>
      </Row>
    </Form>
  </Container>
);
