import React, { FunctionComponent, CSSProperties } from "react";
import { Container, Col, Row } from "react-bootstrap";

/**
 * Footer must contain
 * Contact Info
 * Short Info about the page
 * Aux Links:
 * - About Us Page
 */

export const Footer: FunctionComponent = () => (
  <footer>
    <Container>
      <Row style={Footer_Row_Background}>
        <Col>
          eReforestation 
          About 
          Contact 
        </Col>
        <Col></Col>
      </Row>
    </Container>
  </footer>
);

const Footer_Row_Background: CSSProperties = {
  backgroundColor: "gray",
  height: "300px"
};

export default Footer;
