import React, { FunctionComponent } from "react";
import { Container, Image } from "react-bootstrap";

import { INews } from "../../../interfaces/models/INews";
import { APIS_ENDPOINTS } from "../config/endpoints";

export const NewsDetails: FunctionComponent<NewsDetailsProps> = ({newsDetails}) => (
  <Container>
    <Image
      src={`${APIS_ENDPOINTS.staticFiles.route}/${newsDetails.featureImage}`}
      className="d-block w-100 pb-4"
    />
    <h2>{newsDetails.headline}</h2>
    <h5>{newsDetails.author}</h5>
    <h6>{new Date(newsDetails.createdAt!).toLocaleDateString()}</h6>
    <div dangerouslySetInnerHTML={{__html: newsDetails.content}}></div>
  </Container>
);

export interface NewsDetailsProps {
  newsDetails: INews;
}

