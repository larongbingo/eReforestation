import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import DENRPenroVid from "../images/DENR-PENRO.mp4";
import { NewsCardDeck } from "../components/index/NewsCardDeck";
import { EventsCardDeck } from "../components/index/EventsCardDeck";

/**
 * Needs to show
 * - 5 newest news
 * - 5 newest events
 * - 5 finished events
 */
export const Index: FunctionComponent = () => (
  <Container>
    <video width="100%" autoPlay muted controls>
      <source src={DENRPenroVid} type="video/mp4" />
    </video>

    <h2 className="mt-5">Latest News</h2>
    <NewsCardDeck />

    <h2 className="mt-5">Upcoming Events</h2>
    <EventsCardDeck />

  </Container>
);

export default Index;
