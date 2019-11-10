import { Controller, Delete, Post, Put, Inject, Body, UseGuards, UnauthorizedException, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IFileContentManagerService } from "../../../../interfaces/services/IFileService";
import { IUser } from "../../../../interfaces/models/IUser";
import { UserEntity } from "../../decorators/User-Entity.Decorator";

import { CreateArticleDto } from "./dto/CreateArticle.Dto";
import { UpdateArticleDto } from "./dto/UpdateArticle.Dto";

@Controller("/admin/file/content")
export class FileContentManagerController {

  constructor(
    @Inject(IFileContentManagerService) private readonly fileContentManagerService: IFileContentManagerService,
    @Inject(IPermissionService) private readonly permissionService: IPermissionService,
  ) {}

  @UseGuards(AuthGuard("bearer"))
  @Post("/:fileId")
  public async createArticle(
    @Body() createArticle: CreateArticleDto,
    @UserEntity() user: IUser,
    @Param() fileId: string,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException();
    }

    const article = await this.fileContentManagerService.createArticle(createArticle, fileId);

    return {iat: Date.now(), article};
  }

  @UseGuards(AuthGuard("bearer"))
  @Put("/:articleId")
  public async updateArticle(
    @Body() updateArticle: UpdateArticleDto,
    @UserEntity() user: IUser,
    @Param() articleId: string,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException();
    }

    const updatedArticle = await this.fileContentManagerService.updateArticle(updateArticle, articleId);

    return {iat: Date.now(), updatedArticle};
  }

  @UseGuards(AuthGuard("bearer"))
  @Delete("/:articleId")
  public async deleteArticle(
    @UserEntity() user: IUser,
    @Param() articleId: string,
  ) {
    if (!await this.permissionService.isUserAdminOrSuperUser(user.id)) {
      throw new UnauthorizedException();
    }

    await this.fileContentManagerService.deleteArticle(Number(articleId));

    return {iat: Date.now()};
  }

}
