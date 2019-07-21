import { Injectable, Inject, UnauthorizedException, Provider } from "@nestjs/common";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { INewsService } from "../../../../interfaces/services/INewsService";
import { INews } from "../../../../interfaces/models/INews";
import { News } from "../database/models/News.Model";

@Injectable()
export class NewsService implements INewsService {
  constructor(
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  private async checkPermissions(userId: string) {
    if (!(await this.permissionService.isUserAdmin(userId) || await this.permissionService.isUserSuperUser(userId))) {
      throw new UnauthorizedException("You are not authorized to create a news");
    }
  }

  public async getNews(num?: number): Promise<INews[]> {
    return News.findAll({limit: num ? num : null});
  }

  public async getNewsById(id: string): Promise<INews> {
    return News.findOne({where: {id}});
  }

  public async getNewsByPage(page: number, pageSize: number = 10): Promise<INews[]> {
    const offset = pageSize * page;
    const limit = offset + pageSize;

    return News.findAll({limit, offset});
  }

  public async createNews(userId: string, details: INews): Promise<INews> {
    await this.checkPermissions(userId);
    return News.create(details);
  }

  public async updateNews(userId: string, newsId: string, newDetails: Partial<INews>): Promise<INews> {
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
