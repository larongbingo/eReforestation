import React, { FunctionComponent, CSSProperties } from "react";

import { isDateToday } from "../../libs/dates";
import { IEvent } from "../../../../interfaces/models/IEvent";

export const EventListEntry: FunctionComponent<EventListEntryProps> = ({event}) => (
  <tr style={getStyles(new Date(event.date))}>
    <td>{new Date(event.date).toUTCString()}</td>
    <td>{event.title}</td>
    <td>{event.location}</td>
  </tr>
);


const EventListEntry__tr__EventOngoing: CSSProperties = {
  backgroundColor: "green",
};

const EventListEntry__tr__EventFinished: CSSProperties = {
  backgroundColor: "gray",
}

function getStyles(date: Date): CSSProperties | undefined {
  if(isDateToday(date)) { return EventListEntry__tr__EventOngoing; }
  if(date < new Date()) { return EventListEntry__tr__EventFinished; }
}

export interface EventListEntryProps {
  event: IEvent;
}

export default EventListEntry;
