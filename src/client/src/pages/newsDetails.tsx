import React, { FunctionComponent, useState, useEffect } from "react";
import { match } from "react-router-dom";
import { Container } from "react-bootstrap";

import { NewsDetails } from "../components/NewsDetails";
import { APIS_ENDPOINT_ROOT } from "../config/endpoints";

export const NewsDetailsPage: FunctionComponent<NewsDetailsPageProps> = ({match}) => {
  const [newsDetails, setNewsDetails] = useState<any>(null);

  const getNewsDetails = async () => {
    const newsDetailsRes = await fetch(APIS_ENDPOINT_ROOT + "/news/details?id=" + match.params.newsId);
    const newsDetails = await newsDetailsRes.json();
    return newsDetails;
  };

  useEffect(() => {
    getNewsDetails().then(setNewsDetails)
  }, []);

  if(!newsDetails) {
    return (
      <Container>
        <h2>Loading</h2>
      </Container>
    );
  }

  return (
    <Container>
      <NewsDetails newsDetails={newsDetails!.news} />
    </Container>
  );
}

export interface NewsDetailsPageProps {
  match: match<NewsDetailsMatch>;
}

type NewsDetailsMatch = {
  newsId: string;
};
