import React, { FunctionComponent } from "react";

import Layout from "./Layout";

import { INews } from "../../interfaces/INews";

// TODO: Add image banner if present
// TODO: Add image album if any pics are present

export const NewsListEntry: FunctionComponent<NewsListEntryProps> = ({news}) => (
  <Layout title={`eReforestation - ${news.title}`}>

  </Layout>
);

export type NewsListEntryProps = {
  news: INews
};
