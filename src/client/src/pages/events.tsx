import React, { Component } from "react";
import { Container } from "react-bootstrap";

import { EventList } from "../components/events";
import { IEvent } from "../../../interfaces/models/IEvent";

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
    return [
      {
        id: "1",
        title: "Testing Event 1",
        location: "Test",
        date: new Date(),
        description: "This is a test"
      },
      {
        id: "2",
        title: "Testing Event 2",
        location: "Test",
        date: new Date(),
        description: "This is a test"
      },
      {
        id: "3",
        title: "Testing Event 3",
        location: "Test",
        date: new Date(),
        description: "This is a test"
      },
      {
        id: "4",
        title: "Testing Uvuvwevwevwe",
        location: "Test",
        date: new Date("05/29/2020"),
        description: "This is a test",
      },
      {
        id: "5",
        title: "Testin past",
        location: "Test123",
        date: new Date("12/12/1998"),
        description: "This is a test"
      }
    ];
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
