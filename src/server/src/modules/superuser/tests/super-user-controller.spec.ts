import { ISuperUserService } from "../../../../../interfaces/services/ISuperUserService";
import { IPermissionService } from "../../../../../interfaces/services/IPermissionService";
import { ILog } from "../../../../../interfaces/models/ILog";
import { IUser } from "../../../../../interfaces/models/IUser";
import { SuperUserController } from "../SuperUser.Controller";

const testingLog: ILog = {
  event: "testing",
  description: "testing",
};

const testingUser: IUser = {
  id: "testing",
  username: "testing",
  password: "testing",
};

// @ts-ignore
const mockedIPermissionService: IPermissionService = {
  isUserSuperUser: jest.fn().mockResolvedValue(true),
};

const mockedISuperUserService: ISuperUserService = {
  getEventLogs: jest.fn().mockResolvedValue([{...testingLog}]),
  assignUserAsAdmin: jest.fn().mockResolvedValue(null),
  assignUserAsSuperUser: jest.fn().mockResolvedValue(null),
};

describe("SuperUserController (Unit)", () => {

  const sut = new SuperUserController(mockedISuperUserService, mockedIPermissionService);

  describe("getLogs", () => {

    it("should return an object that contains a list of log objects when user have permission", async () => {

      // Arrange
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      const result = await sut.getLogs(user);

      // Assert
      // @ts-ignore
      expect(result.logs).toStrictEqual([{...testingLog}]);

    });

    it("should throw an exception when user does not have permission", async () => {

      // Arrange
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const result = async () => await sut.getLogs(user);

      // Assert
      await expect(result()).rejects.toThrow();

    });

    it("should have called SuperUserService.getEventLogs() with user id", async () => {

      // Arrange
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.getLogs(user);

      // Assert
      expect(mockedISuperUserService.getEventLogs).toBeCalledWith(user.id);

    });

  });

  describe("assignAdminToUser", () => {

    it("should return an object that holds a timestamp prop", async () => {

      // Arrange
      const userId = "1testing";
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      const result = await sut.assignAdminToUser(user, userId);

      // Assert
      // @ts-ignore
      expect(result.iat).not.toBeNull();

    });

    it("should throw an exception when user does not have permission", async () => {

      // Arrange
      const userId = "1testing";
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const result = async () => await sut.assignAdminToUser(user, userId);

      // Assert
      await expect(result()).rejects.toThrow();

    });

    it("should have called SuperUserService.assignUserAsAdmin() with 2 ids", async () => {

      // Arrange
      const userId = "1testing";
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.assignAdminToUser(user, userId);

      // Assert
      expect(mockedISuperUserService.assignUserAsAdmin).toBeCalledWith(user.id, userId);

    });

  });

  describe("assignSudoToUser", () => {

    it("should return an object that holds a timestamp prop", async () => {

      // Arrange
      const userId = "1testing";
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      const result = await sut.assignSudoToUser(user, userId);

      // Assert
      // @ts-ignore
      expect(result.iat).not.toBeNull();

    });

    it("should throw an exception when user does not have permission", async () => {

      // Arrange
      const userId = "testing123";
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const result = async () => sut.assignSudoToUser(user, userId);

      // Assert
      await expect(result()).rejects.toThrow();

    });

    it("should have called SuperUserService.assignUserAsSuperUser() with 2 ids", async () => {

      // Arrange
      const userId = "1testing";
      const user = {...testingUser};
      mockedIPermissionService.isUserSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.assignSudoToUser(user, userId);

      // Assert
      expect(mockedISuperUserService.assignUserAsSuperUser).toBeCalledWith(user.id, userId);

    });

  });

});
