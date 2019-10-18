import React, { FunctionComponent, CSSProperties }  from "react";
import { Container, Row, Col } from "react-bootstrap";

import { GovLinks } from "./GovLinks";
import { Services } from "./Services";
import { QuickLinks } from "./QuickLinks";
import { Address } from "./Address";

// TODO: Add other info pertaining to DENR
export const Footer: FunctionComponent = () => (
  <Container>
    <Row className="pt-5">
      <Col lg={3} md={12}>
        <img
          className="d-box w-100" 
          data-src="holder.js/300x200"
        />
      </Col>
      <Col lg={5} md={7} sm={12}>
        <Row>
          <Col sm={4}>
            <GovLinks />
          </Col>
          <Col sm={4}>
            <QuickLinks />
          </Col>
          <Col sm={4}>
            <Services />
          </Col>
        </Row>
      </Col>
      <Col lg={4} md={5} sm={12}>
        <Address />
      </Col>
    </Row>
    <p style={copyright_centered}>Copyright, 2019</p>
  </Container>
);

const copyright_centered: CSSProperties = {
  textAlign: "center",
};
