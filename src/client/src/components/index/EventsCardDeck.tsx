import React from "react";
import { CardDeck, Card } from "react-bootstrap";

export const EventsCardDeck: React.FC = () => (
  <CardDeck className="mt-4">
    <Card>
      <Card.Img
        variant="top"
        src="holder.js/100x180"
        className="d-block w-100"
      />
      <Card.Body>
        <Card.Title>This is an event title</Card.Title>
        <Card.Subtitle>Starts at: {new Date().toLocaleDateString()}</Card.Subtitle>
        <Card.Text>
          This is a descriptive article. This is a descriptive article. This is
          a descriptive article. This is a descriptive article.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Img
        variant="top"
        src="holder.js/100x180"
        className="d-block w-100"
      />
      <Card.Body>
        <Card.Title>This is an event title</Card.Title>
        <Card.Subtitle>Starts at: {new Date().toLocaleDateString()}</Card.Subtitle>
        <Card.Text>
          This is a descriptive article. This is a descriptive article. This is
          a descriptive article. This is a descriptive article.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card>
      <Card.Img
        variant="top"
        src="holder.js/100x180"
        className="d-block w-100"
      />
      <Card.Body>
        <Card.Title>This is an event title</Card.Title>
        <Card.Subtitle>Starts at: {new Date().toLocaleDateString()}</Card.Subtitle>
        <Card.Text>
          This is a descriptive article. This is a descriptive article. This is
          a descriptive article. This is a descriptive article.
        </Card.Text>
      </Card.Body>
    </Card>
  </CardDeck>
);
