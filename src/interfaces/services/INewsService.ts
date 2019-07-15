import { INews } from "../models/INews";

export interface INewsService {
  getNews(num?: number): Promise<INews[]>;

  createNews(userId: string, details: INews): Promise<INews>;

  updateNews(userId: string, newsId: string, newDetails: Partial<INews>): Promise<INews>;

  deleteNews(userId: string, newsId: string): Promise<boolean>;
}
