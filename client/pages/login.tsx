import React, { FunctionComponent } from "react";
import { Form, Container } from "react-bootstrap";

import Layout from "../components/Layout";

export const LogIn: FunctionComponent = () => (
  <Layout title="eReforestation - Log In">
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" />
        </Form.Group>
        <Form.Control type="button" value="Log In" />
      </Form>
    </Container>
  </Layout>
);

export default LogIn;
