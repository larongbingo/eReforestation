import React, { FunctionComponent, CSSProperties } from "react";

import { IEvent } from "../../interfaces/IEvent";
import { isToday } from "../lib/isToday";

export type EventListEntryProps = {
  event: IEvent;
};

export const EventListEntry: FunctionComponent<EventListEntryProps> = ({event}) => (
  <tr style={eventStyleSelector(event.date)}>
    <td>{event.date}</td>
    <td>{event.title}</td>
    <td>{event.location}</td>
  </tr>
);

const eventStyleSelector = (date: string) => {
  if(isToday(new Date(date))) {
    return EventOngoingStyle;
  }
  else if(new Date(date) < new Date()) {
    return EventFinishedStyle;
  }
};

const EventFinishedStyle: CSSProperties = {
  backgroundColor: "gray",
};

const EventOngoingStyle: CSSProperties = {
  backgroundColor: "green",
};
