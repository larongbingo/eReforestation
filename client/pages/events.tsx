import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import { IEvent } from "../../interfaces/IEvent";
import { EventList } from "../components/EventList";
import Layout from "../components/Layout";

function getEvents(): IEvent[] {
  return [
    {
      id: "1",
      date: "05/29/1998",
      location: "Asdasd",
      title: "Reforestation test"
    },
    {
      id: "2",
      date: "07/04/2019",
      location: "Asdasd",
      title: "Reforestation test"
    },
    {
      id: "3",
      date: "11/21/2020",
      location: "Asdasd",
      title: "Reforestation test"
    },
    {
      id: "4",
      date: "06/24/2019",
      location: "Afirca",
      title: "Reforestation Today"
    }
  ];
}

// TODO: Add a query feature for events

/**
 * Holds all of the past, present and future tree planting activities
 */
export const Events: FunctionComponent = () => (
  <Layout title="eReforestation - Events">
    <Container>
      <EventList events={getEvents()} />
    </Container>
  </Layout>
);

export default Events;
