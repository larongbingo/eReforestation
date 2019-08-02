import React, { FunctionComponent } from "react";
import { Container, Carousel } from "react-bootstrap";
import "holderjs";

/**
 * Needs to show
 * - 5 newest news
 * - 5 newest events
 * - 5 finished events
 */
export const Index: FunctionComponent = () => (
  <Container>
    <Carousel>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          data-src="holder.js/300x200"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          data-src="holder.js/300x200"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          data-src="holder.js/300x200"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img 
          className="d-block w-100"
          data-src="holder.js/300x200"
        />
      </Carousel.Item>
    </Carousel>
    This is a test asdasdasdasda
  </Container>
);

export default Index;
