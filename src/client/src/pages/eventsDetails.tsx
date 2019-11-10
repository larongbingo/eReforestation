import React, { FunctionComponent, useState, useEffect } from "react";
import { match } from "react-router-dom";
import { Container } from "react-bootstrap";

import { APIS_ENDPOINTS } from "../config/endpoints";
import { EventDetails } from "../components/EventDetails";

export const EventDetailsPage: FunctionComponent<EventDetailsPageProps> = ({match}) => {
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    getEventDetails(match.params.eventId)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        setEvent(res.event);
      });
  }, []);
  
  if(!event) {
    return (
      <Container>
        Loading
      </Container>
    );
  }

  return (
    <Container>
      <EventDetails eventDetails={event} />
    </Container>
  );
};

export interface EventDetailsPageProps {
  match: match<{eventId: string}>;
}

const getEventDetails = (eventId: string) => {
  return fetch(`${APIS_ENDPOINTS.events.getEventDetails.route}/${eventId}`, {
    method: APIS_ENDPOINTS.events.getEventDetails.method,
  });
}
