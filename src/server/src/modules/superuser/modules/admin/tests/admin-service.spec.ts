import { UnauthorizedException } from "@nestjs/common";

import { IPermissionService } from "../../../../../../../interfaces/services/IPermissionService";
import { IEventParticipantsService } from "../../../../../../../interfaces/services/IEventParticipantsService";
import { IUserService } from "../../../../../../../interfaces/services/IUserService";
import { AdminService } from "../Admin.Service";

// @ts-ignore
const mockedIPermissionService: IPermissionService = {
  isUserAdminOrSuperUser: jest.fn().mockResolvedValue(true),
};

// @ts-ignore
const mockedIEventParticipantsService: IEventParticipantsService = {
  updateOneById: jest.fn().mockResolvedValue(null),
};

// @ts-ignore
const mockedIUserService: IUserService = {
  destroyUser: jest.fn().mockResolvedValue(null),

  // @ts-ignore
  restoreUser: jest.fn().mockResolvedValue(null),
};

describe("AdminService (Unit)", () => {

  const sut = new AdminService(mockedIPermissionService, mockedIEventParticipantsService, mockedIUserService);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("confirmParticipantApplication", () => {

    it("should throw UnauthorizedException when user does not have access", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const confirmationId = "testingConfirmation";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const t = async () => await sut.confirmParticipantApplication(adminId, confirmationId);

      // Assert
      expect(t()).rejects.toThrow(UnauthorizedException);

    });

    it("should call EventParticipantService.updateOneById()", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const confirmationId = "testingConfirmation";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.confirmParticipantApplication(adminId, confirmationId);

      // Assert
      expect(mockedIEventParticipantsService.updateOneById).toBeCalledWith(confirmationId, { confirmed: true });

    });

  });

  describe("revokeParticipantApplication", () => {

    it("should throw UnauthorizedException when user does not have access", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const confirmationId = "testingConfirmation";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const t = async () => await sut.revokeParticipantApplication(adminId, confirmationId);

      // Assert
      expect(t()).rejects.toThrow(UnauthorizedException);

    });

    it("should call EventParticipantService.updateOneById()", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const confirmationId = "testingConfirmation";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.revokeParticipantApplication(adminId, confirmationId);

      // Assert
      expect(mockedIEventParticipantsService.updateOneById).toBeCalledWith(confirmationId, { confirmed: false });

    });

  });

  describe("banUser", () => {

    it("should throw UnauthorizedException when user does not have access", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const confirmationId = "testingConfirmation";
      const reason = "testing";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const t = async () => await sut.banUser(adminId, confirmationId, reason);

      // Assert
      expect(t()).rejects.toThrow(UnauthorizedException);

    });

    it("should call UserService.destroyUser()", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const userId = "testingUser";
      const reason = "testing";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.banUser(adminId, userId, reason);

      // Assert
      expect(mockedIUserService.destroyUser).toBeCalledWith(userId);

    });

  });

  describe("unbanUser", () => {

    it("should throw UnauthorizedException when user does not have access", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const confirmationId = "testingConfirmation";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const t = async () => await sut.unbanUser(adminId, confirmationId);

      // Assert
      expect(t()).rejects.toThrow(UnauthorizedException);

    });

    it("should call UserService.restoreUser()", async () => {

      // Arrange
      const adminId = "testingAdmin";
      const userId = "testingUser";
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.unbanUser(adminId, userId);

      // Assert
      // @ts-ignore
      expect(mockedIUserService.restoreUser).toBeCalledWith(userId);

    });

  });

});
