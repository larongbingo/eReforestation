import { Controller, Inject, Query, Get, Body, Post, UseGuards, Put, Param, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiUseTags,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiImplicitHeader,
  ApiImplicitFile,
  ApiOperation,
  ApiImplicitParam,
  ApiConsumes,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { INewsService } from "../../../../interfaces/services/INewsService";
import { IGalleryService } from "../../../../interfaces/services/IGalleryService";
import { IUser } from "../../../../interfaces/models/IUser";
import { File } from "../../types";

import { CreateNewsDto } from "./dto/CreateNews.Dto";
import { UpdateNewsDto } from "./dto/UpdateNews.Dto";

// TODO: Move CRUD of news as a separate class
@Controller("/news")
export class NewsController {
  constructor(
    @Inject(INewsService) private readonly newsService: INewsService,
    @Inject(IGalleryService) private readonly galleryService: IGalleryService,
  ) {}

  @ApiUseTags("Public")
  @ApiOkResponse({description: "The newest news"})
  @ApiImplicitQuery({name: "num", description: "The number of news", required: false})
  @Get("/newest")
  public async getNewestNewsList(@Query("num") num: number = 10) {
    const newsList = await this.newsService.getNews(num);
    return {iat: Date.now(), newsList};
  }

  @ApiUseTags("Public")
  @ApiOkResponse({description: "The content of the news"})
  @ApiImplicitQuery({name: "id", description: "The id of the news", required: true})
  @Get("/details")
  public async getNewsById(@Query("id") id: string) {
    const news = await this.newsService.getNewsById(id);
    return {iat: Date.now(), news};
  }

  @ApiUseTags("Public")
  @ApiOkResponse({description: "The paginated list of news"})
  @ApiImplicitQuery({name: "page", description: "The page number of list", required: true})
  @ApiImplicitQuery({name: "pageSize", description: "The number of news in a page", required: false})
  @Get()
  public async getNewsListByPage(@Query("page") page: number = 0, @Query("pageSize") pageSize: number = 10) {
    const newsList = await this.newsService.getNewsByPage(page, pageSize);
    return {iat: Date.now(), newsList};
  }

  @ApiUseTags("Public")
  @ApiOkResponse({description: "The number pages of news list"})
  @ApiImplicitQuery({name: "pageSize", description: "The number of news in a page", required: false})
  @Get("/pages")
  public async getPageLength(@Query("pageSize") pageSize: number = 10) {
    const length = await this.newsService.getNewsPages(pageSize);
    return {iat: Date.now(), length};
  }

  @ApiUseTags("Admin")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({title: "Create News"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiImplicitFile({name: "featureImage", required: true, description: "Feature Image of the news"})
  @ApiCreatedResponse({description: "The news details that was created"})
  @ApiUnauthorizedResponse({description: "The account must have an admin or sudo permission"})
  @Post()
  @UseInterceptors(FileInterceptor("featureImage"))
  @UseGuards(AuthGuard("bearer"))
  public async createNews(
    @UserEntity() user: IUser,
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() featureImage: File,
  ) {
    const fileName = await this.galleryService.storeImage(featureImage.buffer, featureImage.originalname);
    const details = {...createNewsDto, featureImage: fileName};
    const news = await this.newsService.createNews(user.id, details);
    return {iat: Date.now(), news};
  }

  @ApiUseTags("Admin")
  @ApiConsumes("multipart/form-data")
  @ApiOperation({title: "Update News"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiImplicitFile({name: "featureImage", required: false, description: "Feature Image of the news"})
  @ApiCreatedResponse({description: "The news details that was updated"})
  @ApiUnauthorizedResponse({description: "The account must have an admin or sudo permission"})
  @Put("/:newsId")
  @UseInterceptors(FileInterceptor("featureImage"))
  @UseGuards(AuthGuard("bearer"))
  public async updateNews(
    @UserEntity() user: IUser,
    @Body() updateNewsDto: UpdateNewsDto,
    @Param("newsId") newsId: string,
    @UploadedFile() featureImage: File,
  ) {
    const fileName = await this.galleryService.storeImage(featureImage.buffer, featureImage.originalname);
    const newDetails = {...updateNewsDto, fileName};
    const updatedNews = await this.newsService.updateNews(user.id, newsId, newDetails);
    return {iat: Date.now(), updatedNews};
  }

  @ApiUseTags("Admin")
  @ApiOperation({title: "Delete News"})
  @ApiImplicitParam({name: "newsId", required: true})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "The news details that was deleted"})
  @ApiUnauthorizedResponse({description: "The account must have an admin or sudo permission"})
  @Delete("/:newsId")
  @UseGuards(AuthGuard("bearer"))
  public async deleteNews(@UserEntity() user: IUser, @Param("newsId") newsId: string) {
    this.newsService.deleteNews(user.id, newsId);
    return {iat: Date.now()};
  }
}
