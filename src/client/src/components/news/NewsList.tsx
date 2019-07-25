import React, { FunctionComponent } from "react";
import { Table } from "react-bootstrap";

import { INews } from "../../../../interfaces/models/INews";

import { NewsListEntry } from "./NewsListEntry";

export const NewsList: FunctionComponent<NewsList> = ({newsList}) => (
  <Table responsive>
    <tbody>
      { newsList.map(news => <NewsListEntry news={news} key={news.id} />) }
    </tbody>
  </Table>
);

export interface NewsList {
  newsList: INews[];
}
