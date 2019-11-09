import { Injectable, Provider } from "@nestjs/common";

import { IFileContentManagerService } from "../../../../interfaces/services/IFileService";
import { INews } from "../../../../interfaces/models/INews";
import { News } from "../database/models/News.Model";
import { NewsMeta } from "../database/models/NewsMeta.Model";

@Injectable()
export class FileContentManagerService implements IFileContentManagerService {

  public async createArticle(article: INews, fileId: string): Promise<INews> {
    const news = await News.create(article);
    await NewsMeta.create({fileId, newsId: news.id});
    return news;
  }

  public async updateArticle(article: Partial<INews>, articleId: string): Promise<INews> {
    const updatedNews = await News.update(article, {where: {id: articleId}});
    return updatedNews[1][0];
  }

  public async deleteArticle(articleId: number): Promise<void> {
    await News.destroy({where: {id: articleId}});
    return;
  }

}

export const FileContentManagerServiceProvider: Provider = {
  provide: IFileContentManagerService,
  useClass: FileContentManagerService,
};
