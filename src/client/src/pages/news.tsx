import React, { FunctionComponent, useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import { INews } from "../../../interfaces/models/INews";
import { APIS_ENDPOINTS } from "../config/endpoints";
import { NewsList } from "../components/news";

// TODO: Add pagination

async function getNewsPage(): Promise<INews[]> {
  const newsListRes = await fetch(APIS_ENDPOINTS.news.pages.route, {
    method: APIS_ENDPOINTS.news.pages.method,
  });

  const newsList = await newsListRes.json();

  return newsList.newsList;
}

export const NewsListPage: FunctionComponent = () => {
  const [newsList, setNewsList] = useState<INews[]>([]);

  useEffect(() => {
    getNewsPage().then(fetchedNews => setNewsList(fetchedNews))
  }, []);

  return (
    <Container>
      <NewsList newsList={newsList} />
    </Container>
  );
};
