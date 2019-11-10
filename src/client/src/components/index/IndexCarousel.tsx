import React, { FunctionComponent } from "react";
import { Carousel } from "react-bootstrap";

export const IndexCarousel: FunctionComponent = () => (
  <Carousel>
    <Carousel.Item>
      <img className="d-block w-100" data-src="holder.js/300x500" />
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" data-src="holder.js/300x500" />
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" data-src="holder.js/300x500" />
    </Carousel.Item>
    <Carousel.Item>
      <img className="d-block w-100" data-src="holder.js/300x500" />
    </Carousel.Item>
  </Carousel>
);
