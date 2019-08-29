import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import { IndexCarousel } from "./index/IndexCarousel";
import { NewsCardDeck } from "./index/NewsCardDeck";
import { EventsCardDeck } from "./index/EventsCardDeck";

/**
 * Needs to show
 * - 5 newest news
 * - 5 newest events
 * - 5 finished events
 */
export const Index: FunctionComponent = () => (
  <Container>
    <IndexCarousel />

    <h2 className="mt-5">Latest News</h2>
    <NewsCardDeck />
    <NewsCardDeck />

    <h2 className="mt-5">Upcoming Events</h2>
    <EventsCardDeck />
    <EventsCardDeck />

    This is a test asdasdasdasda
  </Container>
);

export default Index;
