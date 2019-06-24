import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

import { EventListEntry } from "./EventListEntry";

import { IEvent } from "../../interfaces/IEvent";

export type EventListProps = {
  events: IEvent[];
};

export const EventList: FunctionComponent<EventListProps> = ({events}) => (
  <Table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Event Title</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody>
      { events.map(event => <EventListEntry event={event} key={event.id} />) }
    </tbody>
  </Table>
);
