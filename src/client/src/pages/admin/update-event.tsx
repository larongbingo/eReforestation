import React, { useState, useEffect } from "react";
import { match } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
// @ts-ignore
import ImageCompress from "quill-image-compress";
// @ts-ignore
import ImageUploader from "quill-image-uploader";

import { APIS_ENDPOINTS } from "../../config/endpoints";
import { getSessionKey } from "../../libs/session";
import { QUILL_MODULES_CONFIG } from "../../config/quillModulesConfig";

Quill.register("modules/imageCompress", ImageCompress);
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/imageUploader", ImageUploader);

export const UpdateEvent: React.FC<UpdateEventProps> = ({match}) => {
  let featureImageRef: HTMLInputElement;
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(`${APIS_ENDPOINTS.events.getEventDetails.route}/${match.params.eventId}`, {
      method: APIS_ENDPOINTS.events.getEventDetails.method
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setStatus(res.event.status);
      setDate(res.event.date);
      setTitle(res.event.title);
      setDescription(res.event.description);
      setLocation(res.event.location);
    });
  }, []);

  return (
    <Container style={{paddingTop: "20px", paddingBottom: "20px"}}>
      <Row style={{paddingBottom: "10px"}}>
        <Col>
          <Button variant="success" onClick={() => createEvent({title, description, date, location, status}, featureImageRef, match.params.eventId)}>Update</Button>
        </Col>
        <Col>
          <Button variant="danger">Cancel</Button>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={(e: any) => setTitle(e.target.value)} type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control value={date} onChange={(e: any) => setDate(e.target.value)} type="date" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control value={location} onChange={(e: any) => setLocation(e.target.value)} type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Feature Image</Form.Label>
        <Form.Control name="featureImage" type="file" ref={(refObject: any) => featureImageRef = refObject} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control value={status} onChange={(e: any) => setStatus(e.target.value)} name="status" as="select">
          <option>Go</option>
          <option>Cancelled</option>
          <option>Postponed</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Details</Form.Label>
        <ReactQuill
          value={description}
          modules={QUILL_MODULES_CONFIG}
          onChange={setDescription}
        />
      </Form.Group>
    </Container>
  );
};

export type UpdateEventProps = {
  match: match<{eventId: string}>;
};

function createEvent(eventDetails: any, featureImageRef: HTMLInputElement, eventId: string) {
  console.log(eventDetails);
  const formData = new FormData();

  if (featureImageRef.files![0]) {
    formData.append("featureImage", featureImageRef.files![0]);
  }

  Object.keys(eventDetails).forEach(key => formData.append(key, eventDetails[key]));

  return fetch(`${APIS_ENDPOINTS.events.updateEvent.route}/${eventId}`, {
    method: APIS_ENDPOINTS.events.updateEvent.method,
    body: formData,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });
}
