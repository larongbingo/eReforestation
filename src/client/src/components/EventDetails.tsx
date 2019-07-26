import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import { IEvent } from "../../../interfaces/models/IEvent";

export const EventDetails: FunctionComponent<EventDetailsProps> = ({eventDetails}) => (
  <Container>
    <h2>{eventDetails.title}</h2>
    <h5>{eventDetails.location}</h5>
    <p>{eventDetails.description}</p>
  </Container>
);

export interface EventDetailsProps {
  eventDetails: IEvent;
}
