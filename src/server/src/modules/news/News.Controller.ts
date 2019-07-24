import { Controller, Inject, Query, Get, Body, Post, UseGuards, Put, Param, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { INewsService } from "../../../../interfaces/services/INewsService";
import { IUser } from "../../../../interfaces/models/IUser";

import { CreateNewsDto } from "./dto/CreateNews.Dto";
import { UpdateNewsDto } from "./dto/UpdateNews.Dto";

@Controller("/news")
export class NewsController {
  constructor(
    @Inject(INewsService) private readonly newsService: INewsService,
  ) {}

  @Get("/newest")
  public async getNewestNewsList(@Query("num") num: number) {
    const newsList = await this.newsService.getNews(num);
    return {iat: Date.now(), newsList};
  }

  @Get("/details")
  public async getNewsById(@Query("id") id: string) {
    const news = await this.newsService.getNewsById(id);
    return {iat: Date.now(), news};
  }

  @Get()
  public async getNewsListByPage(@Query("page") page: number, @Query("pageSize") pageSize: number = 10) {
    const newsList = await this.newsService.getNewsByPage(page, pageSize);
    return {iat: Date.now(), newsList};
  }

  @Get("/pages")
  public async getPageLength(@Query("pageSize") pageSize: number = 10) {
    const length = await this.newsService.getNewsPages(pageSize);
    return {iat: Date.now(), length};
  }

  @Post()
  @UseGuards(AuthGuard("bearer"))
  public async createNews(@UserEntity() user: IUser, @Body() createNewsDto: CreateNewsDto) {
    const news = await this.newsService.createNews(user.id, createNewsDto);
    return {iat: Date.now(), news};
  }

  @Put("/:newsId")
  @UseGuards(AuthGuard("bearer"))
  public async updateNews(@UserEntity() user: IUser, @Body() updateNewsDto: UpdateNewsDto, @Param("newsId") newsId: string) {
    const updatedNews = await this.newsService.updateNews(user.id, newsId, updateNewsDto);
    return {iat: Date.now(), updatedNews};
  }

  @Delete("/:newsId")
  @UseGuards(AuthGuard("bearer"))
  public async deleteNews(@UserEntity() user: IUser, @Param("newsId") newsId: string) {
    this.newsService.deleteNews(user.id, newsId);
    return {iat: Date.now()};
  }
}
