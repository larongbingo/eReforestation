import React, { FunctionComponent, CSSProperties } from "react";
import { Table } from "react-bootstrap";

import { IEvent } from "../../../../interfaces/models/IEvent";

import { EventListEntry } from "./EventListEntry";

export const EventList: FunctionComponent<EventListProps> = ({events}) => (
  <Table responsive>
    <thead>
      <td>Date</td>
      <td>Title</td>
      <td>Location</td>
    </thead>
    { events.map(event => <EventListEntry event={event} key={event.id} />) }
  </Table>
);

export interface EventListProps {
  events: IEvent[];
}

export default EventList;
