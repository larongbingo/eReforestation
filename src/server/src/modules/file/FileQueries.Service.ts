import { Injectable } from "@nestjs/common";

import { IFileQueryService as IFileQueriesService } from "../../../../interfaces/services/IFileService";
import { INews } from "../../../../interfaces/models/INews";
import { IFile } from "../../../../interfaces/models/IFile";
import { File } from "../database/models/File.Model";
import { NewsMeta } from "../database/models/NewsMeta.Model";
import { News } from "../database/models/News.Model";

@Injectable()
export class FileQueriesService implements IFileQueriesService {

  public async getArticleById(articleId: string): Promise<INews> {
    return News.findOne({where: {id: articleId}});
  }

  public async getAllArticlesInFile(fileId: string): Promise<INews[]> {
    return News.findAll({include: [{model: NewsMeta, where: {origin: fileId}}]});
  }

  public async getAllFiles(): Promise<IFile[]> {
    return File.findAll();
  }

}
