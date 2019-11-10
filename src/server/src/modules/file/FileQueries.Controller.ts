import { Controller, Inject, Get, Param } from "@nestjs/common";

import { IFileQueryService } from "../../../../interfaces/services/IFileService";

@Controller("/admin/file")
export class FileQueriesController {

  constructor(
    @Inject(IFileQueryService) private readonly fileQueriesService: IFileQueryService,
  ) {}

  @Get("/content/:articleId")
  public async getArticleById(@Param() articleId: string) {
    const article = await this.fileQueriesService.getArticleById(articleId);
    return {iat: Date.now(), article};
  }

  @Get("/content/details/:fileId")
  public async getArticlesByFileId(@Param() fileId: string) {
    const articles = await this.fileQueriesService.getAllArticlesInFile(fileId);
    return {iat: Date.now(), articles};
  }

  @Get("/all")
  public async getAllFiles() {
    const files = await this.fileQueriesService.getAllFiles();
    return {iat: Date.now(), files};
  }

}
