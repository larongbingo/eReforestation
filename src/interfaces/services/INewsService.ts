import { INews } from "../models/INews";

export const INewsService = "INewsService";
export interface INewsService {
  getNews(num?: number): Promise<INews[]>;

  getNewsById(id: string): Promise<INews>;

  getNewsByPage(page: number, pageSize?: number): Promise<INews[]>;

  getNewsPages(pageSize: number): Promise<number>;

  createNews(userId: string, details: INews): Promise<INews>;

  updateNews(userId: string, newsId: string, newDetails: Partial<INews>): Promise<INews>;

  deleteNews(userId: string, newsId: string): Promise<boolean>;
}
