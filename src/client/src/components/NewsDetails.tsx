import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import { INews } from "../../../interfaces/models/INews";

export const NewsDetails: FunctionComponent<NewsDetailsProps> = ({newsDetails}) => (
  <Container>
    <h2>{newsDetails.headline}</h2>
    <h5>{newsDetails.author}</h5>
    <h6>{newsDetails.createdAt}</h6>
    <p>{newsDetails.content}</p>
  </Container>
);

export interface NewsDetailsProps {
  newsDetails: INews;
}

