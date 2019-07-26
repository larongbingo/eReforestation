import React, { FunctionComponent } from "react";
import { match } from "react-router-dom";
import { Container } from "react-bootstrap";

import { INews } from "../../../interfaces/models/INews";
import { NewsDetails } from "../components/NewsDetails";

export const NewsDetailsPage: FunctionComponent<NewsDetailsPageProps> = ({match}) => {
  const getNewsDetails: () => INews = () => {
    return {
      content: "This is a test",
      headline: "This si a test",
      createdAt: "At the office ibbas",
      author: "This might get removed since we use id, it would be better if we use name",
    };
  };
  
  return (
    <Container>
      <NewsDetails newsDetails={getNewsDetails()} />
    </Container>
  );
}

export interface NewsDetailsPageProps {
  match: match;
}
