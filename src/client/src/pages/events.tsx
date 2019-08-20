import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { EventList } from "../components/events";
import { IEvent } from "../../../interfaces/models/IEvent";
import { APIS_ENDPOINTS } from "../config/endpoints";

export class Events extends Component<any, EventListStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      events: null
    };

    this.getEvents()
      .then((data) => this.setState({isLoading: false, events: data}))
      .catch(() => this.setState({isLoading: false, events: null}));
    // TODO: async and await usage in React
  }

  async getEvents(): Promise<IEvent[]> {
    const res = await fetch(APIS_ENDPOINTS.events.getEvents.route, {
      method: APIS_ENDPOINTS.events.getEvents.method
    });

    const data = await res.json();

    const events: IEvent[] = data.events;

    return events;

  }

  public render = () => {
    if(this.state.isLoading) {
      return (<h1>Loading</h1>);
    }
    else if(this.state.events) {
      return (
        <Container>
          <EventList events={this.state.events} />
        </Container>
      );
    }
    
    return (<h1>An error occurred during the fetching events, please try again later.</h1>);
  }
}

interface EventListStates {
  isLoading: boolean;
  events: IEvent[] | null;
}

export default Events;
