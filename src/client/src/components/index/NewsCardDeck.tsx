import React, { FunctionComponent, useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";

import { APIS_ENDPOINTS } from "../../config/endpoints";
import { NewsCard } from "../news/NewsCard";

export const NewsCardDeck: FunctionComponent = () => {
  const [newsList, setNewsList] = useState<any[] | null>([]);

  useEffect(() => {
    fetch(`${APIS_ENDPOINTS.news.newest.route}?num=6`, {
      method: APIS_ENDPOINTS.news.newest.method
    })
    .then(res => res.json())
    .then(res => setNewsList(res.newsList))
  }, []);

  return (
    <>
      <CardDeck className="mt-4">
        {newsList!.slice(0, 3).map(news => <NewsCard news={news} />)}
      </CardDeck>
      <CardDeck className="mt-4">
        {newsList!.slice(3, 6).map(news => <NewsCard news={news} />)}
      </CardDeck>
    </>
  );
};
