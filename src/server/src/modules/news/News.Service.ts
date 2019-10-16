import { Injectable, Inject, UnauthorizedException, Provider, Logger } from "@nestjs/common";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { INewsService } from "../../../../interfaces/services/INewsService";
import { INews } from "../../../../interfaces/models/INews";
import { News } from "../database/models/News.Model";
import { TEXTS_KEYS } from "../texts/Texts.Key";

@Injectable()
export class NewsService implements INewsService {
  constructor(
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  private async checkPermissions(userId: string) {
    if (!await this.permissionService.isUserAdminOrSuperUser(userId)) {
      throw new UnauthorizedException(
        this.texts.getText(
          TEXTS_KEYS.MISSING_ADMIN_OR_SUDO_CREDENTIALS,
        ),
      );
    }
  }

  public async getNews(num?: number): Promise<INews[]> {
    return News.findAll({limit: num ? Number(num) : null});
  }

  public async getNewsById(id: string): Promise<INews> {
    return News.findOne({where: {id}});
  }

  public async getNewsByPage(page: number, pageSize: number = 10): Promise<INews[]> {
    const offset = pageSize * page;
    const limit = offset + pageSize;

    return News.findAll({limit, offset});
  }

  public async getNewsPages(pageSize: number): Promise<number> {
    const newsCount = await News.count();
    return Math.ceil(newsCount / pageSize);
  }

  public async createNews(userId: string, details: INews): Promise<INews> {
    await this.checkPermissions(userId);
    details.author = userId;
    return News.create(details);
  }

  public async updateNews(userId: string, newsId: string, newDetails: Partial<INews>): Promise<INews> {
    Logger.log(newDetails);
    await this.checkPermissions(userId);
    const news = await News.findOne({where: {id: newsId}});
    Object.keys(newDetails).forEach(key => news[key] = newDetails[key]);
    return news.save();
  }

  public async deleteNews(userId: string, newsId: string): Promise<boolean> {
    await this.checkPermissions(userId);
    const news = await News.findOne({where: {id: newsId}});
    try {
      news.destroy();
    } catch (err) {
      return false;
    }
    return true;
  }

}

export const NewsServiceProvider: Provider<INewsService> = {
  provide: INewsService,
  useClass: NewsService,
};
