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

export const UpdateNews: React.FC<UpdateNewsProps> = ({match}) => {
  let featureImageRef: HTMLInputElement;
  const [content, setContent] = useState("");
  const [headline, setHeadline] = useState("");

  useEffect(() => {
    fetch(APIS_ENDPOINTS.news.newsDetails.route, {

    })
  }, []);

  return (
    <Container style={{paddingTop: "20px", paddingBottom: "20px"}}>
      <Row style={{paddingBottom: "10px"}}>
        <Col>
          <Button variant="success" onClick={() => updateNews(headline, content, featureImageRef)}>Publish</Button>
        </Col>
        <Col>
          <Button variant="danger">Cancel</Button>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control value={headline} onChange={(e: any) => setHeadline(e.target.value)} type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Feature Image</Form.Label>
        <Form.Control name="featureImage" type="file" ref={(refObject: any) => featureImageRef = refObject} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Details</Form.Label>
        <ReactQuill
          value={content}
          modules={QUILL_MODULES_CONFIG}
          onChange={setContent}
        />
      </Form.Group>
    </Container>
  );
};

export type UpdateNewsProps = {
  match: match<UpdateNewsMatch>;
};

export type UpdateNewsMatch = {
  newsId: string;
}

function updateNews(headline: string, content: string, featureImageRef: HTMLInputElement) {
  const formData = new FormData();
  formData.append("featureImage", featureImageRef.files![0])
  formData.append("headline", headline);
  formData.append("content", content);

  return fetch(APIS_ENDPOINTS.news.updateNews.route, {
    method: APIS_ENDPOINTS.news.updateNews.method,
    body: formData,
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
    },
  });
}
