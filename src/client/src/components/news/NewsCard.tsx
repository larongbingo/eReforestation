import React from "react";
import { Card } from "react-bootstrap";

import { cleanHTMLString } from "../../libs/string";
import { APIS_ENDPOINTS, CLIENT_HOST_NAME } from "../../config/endpoints";
import { INews } from "../../../../interfaces/models/INews";

export const NewsCard: React.FC<NewsCardProps> = ({news}) => (
  <Card>
    <Card.Img
      variant="top"
      src={`${APIS_ENDPOINTS.staticFiles.route}/${news.featureImage}`}
      className="d-block w-100"
    />
    <Card.Body>
      <Card.Title>{news.headline}</Card.Title>
      <Card.Subtitle>{new Date(news.createdAt!).toLocaleDateString()}</Card.Subtitle>
      <Card.Text>
        {cleanHTMLString(news.content.slice(0, 150))}
      </Card.Text>
      <Card.Link href={`${CLIENT_HOST_NAME}/news/${news.id}`}>Details</Card.Link>
    </Card.Body>
  </Card>
);

export type NewsCardProps = {
  news: INews;
};
