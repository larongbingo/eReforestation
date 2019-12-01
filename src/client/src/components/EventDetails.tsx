import React, { FunctionComponent } from "react";
import { Container, Image, Button, Row, Col } from "react-bootstrap";

import { getUserPermission } from "../libs/permission";
import { getSessionKey } from "../libs/session";
import { IEvent } from "../../../interfaces/models/IEvent";
import { APIS_ENDPOINTS } from "../config/endpoints";

const EventButtons: React.FC<EventButtonsProps> = ({eventId}) => {
  const [isUserParticipating, setIsUserParticipating] = React.useState<any>(null);

  React.useEffect(() => {
    //fetch
  }, []);

  if(!isUserParticipating) {
    return (<></>);
  }

  return (
    <Row>
      <Col><Button>Volunteer</Button></Col>
      {
        getUserPermission() === "Admin" || getUserPermission() === "Superuser" ?
        <Col><Button onClick={() => window.location.href = `/admin/update-event/${eventId}`}>Update</Button></Col> : null
      }
    </Row>
  );
}

type EventButtonsProps = {
  eventId: string;
};

export const EventDetails: FunctionComponent<EventDetailsProps> = ({eventDetails}) => (
  <Container>
    <Image
      src={`${APIS_ENDPOINTS.staticFiles.route}/${eventDetails.featureImage}`}
      className="d-block w-100 pb-4"
    />
    <h2>{eventDetails.title}</h2>
    <h5>{eventDetails.location}</h5>
    <h5>Starting Date: {eventDetails.date}</h5>
    { getSessionKey() ? <EventButtons eventId={eventDetails.id!} /> : null }
    <div dangerouslySetInnerHTML={{__html: eventDetails.description}}></div>
  </Container>
);

export interface EventDetailsProps {
  eventDetails: IEvent;
}
