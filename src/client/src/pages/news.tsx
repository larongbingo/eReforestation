import React, { FunctionComponent } from "react";
import { Container } from "react-bootstrap";

import { INews } from "../../../interfaces/models/INews";
import { APIS_ENDPOINTS } from "../config/endpoints";
import { NewsList } from "../components/news";

function getNewsPage(): INews[] {
  return [
    {
      headline: "Lorem Ip",
      content: "content: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime quam, iure voluptatibus minima vitae, facere ullam nisi dignissimos tempora eos esse magni ut cum reprehenderit numquam porro possimus velit assumenda?",
      createdAt: "7/26/2019",
      id: "LoremIp:123",
    },
    {
      headline: "Lorem Ip",
      content: "content: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime quam, iure voluptatibus minima vitae, facere ullam nisi dignissimos tempora eos esse magni ut cum reprehenderit numquam porro possimus velit assumenda?",
      createdAt: "7/26/2019",
      id: "LoremIp:123",
    },
    {
      headline: "Lorem Ip",
      content: "content: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime quam, iure voluptatibus minima vitae, facere ullam nisi dignissimos tempora eos esse magni ut cum reprehenderit numquam porro possimus velit assumenda?",
      createdAt: "7/26/2019",
      id: "LoremIp:123",
    },
    {
      headline: "Lorem Ip",
      content: "content: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime quam, iure voluptatibus minima vitae, facere ullam nisi dignissimos tempora eos esse magni ut cum reprehenderit numquam porro possimus velit assumenda?",
      createdAt: "7/26/2019",
      id: "LoremIp:123",
    },
    {
      headline: "Lorem Ip",
      content: "content: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime quam, iure voluptatibus minima vitae, facere ullam nisi dignissimos tempora eos esse magni ut cum reprehenderit numquam porro possimus velit assumenda?",
      createdAt: "7/26/2019",
      id: "LoremIp:123",
    },
  ]
}

export const NewsListPage: FunctionComponent = () => (
  <Container>
    <NewsList newsList={getNewsPage()} />
  </Container>
);
