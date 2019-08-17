import { INewsService } from "../../../../../interfaces/services/INewsService";
import { IUser } from "../../../../../interfaces/models/IUser";
import { INews } from "../../../../../interfaces/models/INews";
import { NewsController } from "../News.Controller";

const testingUser: IUser = {
  id: "123",
  username: "testing",
  password: "testing",
};

const testingNews: INews = {
  id: "123",
  headline: "testing",
  content: "testing",
};

const mockedNewsService: INewsService = {
  getNews: jest.fn().mockResolvedValue([{...testingNews}]),
  getNewsById: jest.fn().mockResolvedValue({...testingNews}),
  getNewsByPage: jest.fn().mockResolvedValue([{...testingNews}]),
  getNewsPages: jest.fn().mockResolvedValue(1),
  createNews: jest.fn().mockResolvedValue({...testingNews}),
  updateNews: jest.fn().mockResolvedValue({...testingNews}),
  deleteNews: jest.fn().mockResolvedValue(true),
};

describe("NewsController (Unit)", () => {
  const sut = new NewsController(mockedNewsService);

  describe("getNewestNewsList", () => {

    it("should call NewsService.getNews() with a number", async () => {

      // Arrange
      const num = 10;

      // Act
      await sut.getNewestNewsList(num);

      // Assert
      expect(mockedNewsService.getNews).toBeCalledWith(num);

    });

    it("should return an object that contans a list/array of news object", async () => {

      // Arrange
      const num = 10;

      // Act
      const result = await sut.getNewestNewsList(num);

      // Assert
      expect(result.newsList).toStrictEqual([{...testingNews}]);

    });

  });

  describe("getNewsById", () => {

    it("should call NewsService.getNewsById() with a string", async () => {

      // Arrange
      const id = "1";

      // Act
      await sut.getNewsById(id);

      // Assert
      expect(mockedNewsService.getNewsById).toBeCalledWith(id);

    });

    it("should return an object that contains a news object", async () => {

      // Arrange
      const id = "1";

      // Act
      const result = await sut.getNewsById(id);

      // Assert
      expect(result.news).toStrictEqual({...testingNews});

    });

  });

  describe("getNewsListByPage", () => {

    it("should call NewsService.getNewsByPage() with 2 numbers", async () => {

      // Arrange
      const page = 10;
      const pageSize = 10;

      // Act
      await sut.getNewsListByPage(page, pageSize);

      // Assert
      expect(mockedNewsService.getNewsByPage).toBeCalledWith(page, pageSize);

    });

    it("should return an object that contains a list of news object", async () => {

      // Arrange
      const page = 10;
      const pageSize = 10;

      // Act
      const result = await sut.getNewsListByPage(page, pageSize);

      // Assert
      expect(result.newsList).toStrictEqual([{...testingNews}]);

    });

  });

  describe("getPageLength", () => {

    it("should call NewsService.getNewsPages() with a number", async () => {

      // Arrange
      const pageSize = 10;

      // Act
      await sut.getPageLength(pageSize);

      // Assert
      expect(mockedNewsService.getNewsPages).toBeCalledWith(pageSize);

    });

    it("should return an object that contains a number", async () => {

      // Arrange
      const pageSize = 10;

      // Act
      const result = await sut.getPageLength(pageSize);

      // Assert
      expect(result.length).toBe(1);

    });

  });

  describe("createNews", () => {

    it("should call NewsService.createNews() with a number and an object", async () => {

      // Arrange
      const newsDetails = {...testingNews};
      const user = {...testingUser};

      // Act
      await sut.createNews(user, newsDetails);

      // Assert
      expect(mockedNewsService.createNews).toBeCalledWith(user.id, newsDetails);

    });

    it("should return an object that contains a news object", async () => {

      // Arrange
      const newsDetails = {...testingNews};
      const user = {...testingUser};

      // Act
      const result = await sut.createNews(user, newsDetails);

      // Assert
      expect(result.news).toStrictEqual({...testingNews});

    });

  });

  describe("updateNews", () => {

    it("should call NewsService.updateNews() with 2 numbers and an object", async () => {

      // Arrange
      const user = {...testingUser};
      const news = {...testingNews};
      const newsId = news.id;

      // Act
      await sut.updateNews(user, news, newsId);

      // Assert
      expect(mockedNewsService.updateNews).toBeCalledWith(user.id, newsId, news);

    });

    it("should return an object that contains a news object", async () => {

      // Arrange
      const user = {...testingUser};
      const news = {...testingNews};
      const newsId = news.id;

      // Act
      const result = await sut.updateNews(user, news, newsId);

      // Assert
      expect(result.updatedNews).toStrictEqual(news);

    });

  });

  describe("deleteNews", () => {

    it("should call NewsService.deleteNews() with numbers", async () => {

      // Arrange
      const user = {...testingUser};
      const newsId = testingNews.id;

      // Act
      await sut.deleteNews(user, newsId);

      // Assert
      expect(mockedNewsService.deleteNews).toBeCalledWith(user.id, newsId);

    });

  });

});
