import { ILog } from "../../../../../interfaces/models/ILog";
import { ILogService } from "../../../../../interfaces/services/ILogService";
import { IPermissionService } from "../../../../../interfaces/services/IPermissionService";
import { SuperUserService } from "../SuperUser.Service";

const testingLog: ILog = {
  event: "testingLog",
  description: "testingLog",
};

const mockedILogService: ILogService = {
  log: jest.fn(),
  getLogs: jest.fn().mockResolvedValue([{...testingLog}]),
};

// @ts-ignore
const mockedIPermissionService: IPermissionService = {
  setAdminPermission: jest.fn(),
  setSuperUserPermission: jest.fn(),
};

describe("SuperUserService (Unit)", () => {

  const sut = new SuperUserService(mockedILogService, mockedIPermissionService);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getEventLogs", () => {

    it("should call LogService.log() with 3 strings", async () => {

      // Arrange
      const sudoId = "testing";

      // Act
      await sut.getEventLogs(sudoId);

      // Assert
      expect(mockedILogService.log).toBeCalledWith(
        "Get Logs",
        `user ${sudoId} requested event logs`,
        JSON.stringify({sudoId}),
      );

    });

    it("should call LogService.getLogs()", async () => {

      // Arrange
      const sudoId = "testing";

      // Act
      await sut.getEventLogs(sudoId);

      // Assert
      expect(mockedILogService.getLogs).toBeCalled();

    });

  });

  describe("assignUserAsAdmin", () => {

    it("should call LogService.log() with 3 strings", async () => {

      // Arrange
      const sudoId = "testingSudo";
      const userId = "testingUser";

      // Act
      await sut.assignUserAsAdmin(sudoId, userId);

      // Assert
      expect(mockedIPermissionService.setAdminPermission).toBeCalledWith(userId);

    });

    it("should call PermissionService.setAdminPermission() with user id", async () => {

      // Arrange
      const sudoId = "testingSudo";
      const userId = "testingUser";

      // Act
      await sut.assignUserAsAdmin(sudoId, userId);

      // Assert
      expect(mockedILogService.log).toBeCalledWith(
        "Assign Admin Permission",
        `user ${sudoId} assigned admin to user ${userId}`,
        JSON.stringify({sudoId, userId}),
      );

    });

  });

  describe("assignUserAsSuperUser", () => {

    it("should call LogService.log() with 3 strings", async () => {

      // Arrange
      const sudoId = "testingSudo";
      const userId = "testingUser";

      // Act
      await sut.assignUserAsSuperUser(sudoId, userId);

      // Assert
      expect(mockedILogService.log).toBeCalledWith(
        "Assign SuperUser Permission",
        `user ${sudoId} assigned superuser to user ${userId}`,
        JSON.stringify({sudoId, userId}),
      );

    });

    it("should call PermissionService.setSuperUserPermission() with user id", async () => {

      // Arrange
      const sudoId = "testingSudo";
      const userId = "testingUser";

      // Act
      await sut.assignUserAsSuperUser(sudoId, userId);

      // Assert
      expect(mockedIPermissionService.setSuperUserPermission).toBeCalledWith(userId);

    });

  });

});
