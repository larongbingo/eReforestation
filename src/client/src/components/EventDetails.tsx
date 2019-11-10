import React, { FunctionComponent } from "react";
import { Container, Image } from "react-bootstrap";

import { IEvent } from "../../../interfaces/models/IEvent";
import { APIS_ENDPOINTS } from "../config/endpoints";

export const EventDetails: FunctionComponent<EventDetailsProps> = ({eventDetails}) => (
  <Container>
    <Image
      src={`${APIS_ENDPOINTS.staticFiles.route}/${eventDetails.featureImage}`}
      className="d-block w-100 pb-4"
    />
    <h2>{eventDetails.title}</h2>
    <h5>{eventDetails.location}</h5>
    <h5>Starting Date: {eventDetails.date}</h5>
    <div dangerouslySetInnerHTML={{__html: eventDetails.description}}></div>
  </Container>
);

export interface EventDetailsProps {
  eventDetails: IEvent;
}
