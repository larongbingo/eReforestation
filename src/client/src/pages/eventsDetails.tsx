import React, { FunctionComponent } from "react";
import { match } from "react-router-dom";
import { Container } from "react-bootstrap";

import { IEvent } from "../../../interfaces/models/IEvent";
import { EventDetails } from "../components/EventDetails";

export const EventDetailsPage: FunctionComponent<EventDetailsPageProps> = ({match}) => {
  const getEventDetails: () => IEvent = () => {
    return {
      title: "This is a test",
      location: "This is a test",
      date: new Date("07/26/2019"),
      description: "This is a testing description",
    };
  }

  return (
    <Container>
      <EventDetails eventDetails={getEventDetails()} />
    </Container>
  );
};

export interface EventDetailsPageProps {
  match: match;
}
