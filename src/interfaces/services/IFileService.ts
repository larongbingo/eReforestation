import { IFile } from "../models/IFile";
import { INews } from "../models/INews";

export const IFileManagerService = "IFileManagerService";
export interface IFileManagerService {

  createFile(file: IFile): Promise<IFile>;

  updateFile(file: Partial<IFile>, fileId: string): Promise<[number, IFile[]]>;

  deleteFile(fileId: string): Promise<void>;

}

export const IFileQueryService = "IFileQueryService";
export interface IFileQueryService {

  getAllArticlesInFile(fileId: string): Promise<INews[]>;

  getAllFiles(): Promise<IFile[]>;

  getArticleById(articleId: string): Promise<INews>;

}

export const IFileContentManagerService = "IFileContentManagerService";
export interface IFileContentManagerService {

  createArticle(article: INews, fileId: string): Promise<INews>;

  updateArticle(article: Partial<INews>, articleId: string): Promise<INews>;

  deleteArticle(articleId: number): Promise<void>;

}

export const IFileContentQueriesService = "IFileContentQueriesService";
export interface IFileContentQueriesService {

}
