import React, { FunctionComponent } from "react";

import { INews } from "../../../../interfaces/models/INews";

export const NewsListEntry: FunctionComponent<NewsListEntryProps> = ({news}) => (
  <tr>
    <td>{new Date(news.createdAt!).toLocaleDateString()}</td>
    <td>
      <a href={"/news/" + news.id}>{news.headline}</a>
    </td>
    <td>{news.author!}</td>
  </tr>
);

export interface NewsListEntryProps {
  news: INews
}
