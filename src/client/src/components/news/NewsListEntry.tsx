import React, { FunctionComponent } from "react";

import { INews } from "../../../../interfaces/models/INews";

export const NewsListEntry: FunctionComponent<NewsListEntryProps> = ({news}) => (
  <tr>
    <td>{new Date(news.createdAt!).toLocaleDateString()}</td>
    <td>{news.headline}</td>
    <td>{news.author!}</td>
  </tr>
);

export interface NewsListEntryProps {
  news: INews
}
