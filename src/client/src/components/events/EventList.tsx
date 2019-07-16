import React, { FunctionComponent, CSSProperties } from "react";
import { Table } from "react-bootstrap";

import { IEvent } from "../../../../interfaces/models/IEvent";

import { EventListEntry } from "./EventListEntry";

export const EventList: FunctionComponent<EventListProps> = ({events}) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Date</th>
        <th>Title</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      { events.map(event => <EventListEntry event={event} key={event.id} />) }
    </tbody>
  </Table>
);

export interface EventListProps {
  events: IEvent[];
}

export default EventList;
