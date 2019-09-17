import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
// @ts-ignore
import ImageCompress from "quill-image-compress";
// @ts-ignore
import ImageUploader from "quill-image-uploader";

import { APIS_ENDPOINTS, APIS_ENDPOINT_ROOT } from "../../config/endpoints";
import { getSessionKey } from "../../libs/session";

Quill.register("modules/imageCompress", ImageCompress);
Quill.register("modules/blotFormatter", BlotFormatter);
Quill.register("modules/imageUploader", ImageUploader);

export const CreateNews: React.FC = () => {
  const [content, setContent] = useState("");
  const [headline, setHeadline] = useState("");

  return (
    <Container style={{paddingTop: "20px", paddingBottom: "20px"}}>
      <Row style={{paddingBottom: "10px"}}>
        <Col>
          <Button variant="success" onClick={() => createNews(headline, content)}>Publish</Button>
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
        <Form.Label>Details</Form.Label>
        <ReactQuill
          value={content}
          modules={modules}
          onChange={setContent}
        />
      </Form.Group>
    </Container>
  );
};

function createNews(headline: string, content: string) {
  console.log(headline, content);
  return fetch(APIS_ENDPOINTS.news.createNews.route, {
    method: APIS_ENDPOINTS.news.createNews.method,
    body: JSON.stringify({ headline, content }),
    headers: {
      "Authorization": `Bearer ${getSessionKey()}`,
      "Content-Type": "application/json",
    },
  });
}

const modules = {
  imageCompress: {},
  imageUploader: {
    upload: async (file: any) => {
      const formData = new FormData();
      formData.append("image", file);
      const imageUploadRes = await fetch(APIS_ENDPOINTS.gallery.upload.route, {
        headers: {
          "Authorization": `Bearer ${getSessionKey()}`
        },
        method: APIS_ENDPOINTS.gallery.upload.method,
        body: formData
      });
      const res = await imageUploadRes.json();
      return `${APIS_ENDPOINT_ROOT}/images/${res.fileName}`;
    }
  },
  blotFormatter: {},
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, {font: []}, {size: []}],
      [{align: ""}, {align: "center"}, {align: "right"}, {align: "justify"}],
      [{color: []}, {background: []}],
      [{script: "sub"}, {script: "super"}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', "code-block"],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  },
  clipboard: { matchVisual: false }
};
