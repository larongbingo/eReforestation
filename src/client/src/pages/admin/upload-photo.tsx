import React from "react";
import { Container, Form, Button } from "react-bootstrap";

import { APIS_ENDPOINTS } from "../../config/endpoints";

export const UploadPhoto: React.FC = () => {
  let imageRef: HTMLInputElement;
  
  const onClick = () => {
    const formData = new FormData();
    formData.append("image", imageRef.files![0]);
    
    fetch(APIS_ENDPOINTS.gallery.upload.route, {
      method: APIS_ENDPOINTS.gallery.upload.method
    });
  };
  
  return (
    <Container>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control ref={(ref: any) => imageRef = ref} type="file" />
      </Form.Group>
      <Button onClick={onClick}>Upload</Button>
    </Container>
  );
};
