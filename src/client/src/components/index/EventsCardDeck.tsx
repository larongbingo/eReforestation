import React, { useEffect, useState } from "react";
import { CardDeck, Card } from "react-bootstrap";

import { APIS_ENDPOINTS } from "../../config/endpoints";
import { IEvent } from "../../../../interfaces/models/IEvent";

export const EventsCardDeck: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  
  useEffect(() => {
    fetch(APIS_ENDPOINTS.events.getEvents.route, {
      method: APIS_ENDPOINTS.events.getEvents.method,
    })
    .then(res => res.json())
    .then(res => setEvents(res.events));
  }, []);

  return (
    <>
      <CardDeck className="mt-4">
        { events.slice(0, 3).map(event => <EventsCard event={event} />) }
      </CardDeck>
      <CardDeck className="mt-4">
        { events.slice(3, 6).map(event => <EventsCard event={event} />) }
      </CardDeck>
    </>
  );
};

const EventsCard: React.FC<EventsCardProps> = ({event}) => (
  <Card>
    <Card.Img variant="top" src={`${APIS_ENDPOINTS.staticFiles.route}/${event.featureImage}`} className="d-block w-100" />
    <Card.Body>
      <Card.Title>{event.title}</Card.Title>
      <Card.Subtitle>
        Starts at: {new Date(event.date).toLocaleDateString()}
      </Card.Subtitle>
      <Card.Text>{event.description}</Card.Text>
      <Card.Link href={"/events/" + event.id}>Details</Card.Link>
    </Card.Body>
  </Card>
);

type EventsCardProps = {
  event: IEvent;
};
