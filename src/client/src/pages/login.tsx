import React, { FunctionComponent, FormEventHandler, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

import { DismissibleAlert } from "../components/DismissibleAlert";
import { logIn, storeSessionKey } from "../libs/session";
import { storeUserPermission } from "../libs/permission";

// TODO: Alert for incorrect password
export const LogIn: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const submitCredentials = () => {
    logIn(username, password)
    .then(res => res.json())
    .then(val => {
      storeSessionKey(val.token);
      setTimeout(storeUserPermission, 1000);
      window.location.replace("/");
    })
    .catch((err) => {
      console.error(err);
      setShowError(true);
    });
  };

  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    submitCredentials();
  };

  const heading = "Incorrect Credentials";
  const message = "Check if your username or password is correct";

  return (
    <Container>
      {showError ? <DismissibleAlert heading={heading} message={message} /> : null}
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" onChange={(e: any) => setUsername(e.target.value)} placeholder="Place username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e: any) => setPassword(e.target.value)} placeholder="Place password" />
        </Form.Group>
        <Button variant="primary" type="submit">Log In</Button>
      </Form>
    </Container>
  );
};
