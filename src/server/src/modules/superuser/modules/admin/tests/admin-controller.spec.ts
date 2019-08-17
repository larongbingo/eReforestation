import { IEventParticipants } from "../../../../../../../interfaces/models/IEventParticipants";
import { IUser } from "../../../../../../../interfaces/models/IUser";
import { IAdminMailingService, IAdminService } from "../../../../../../../interfaces/services/IAdminService";
import { AdminController } from "../Admin.Controller";
import { BanUserDto } from "../dto/BanUser.Dto";

const testingEventParticipants: IEventParticipants = {
  userId: "testingIdUser",
  eventId: "testingIdEvent",
  confirmed: true,
};

const testingUser: IUser = {
  id: "testing",
  username: "testing",
  password: "testing",
};

const mockedIAdminMailingService: IAdminMailingService = {
  mailUserOnBan: jest.fn(),
  mailUserOnFailedApplication: jest.fn(),
  mailUserOnSuccessfulApplication: jest.fn(),
  mailUserOnUnban: jest.fn(),
};

const mockedIAdminService: IAdminService = {
  confirmParticipantApplication: jest.fn().mockResolvedValue({...testingEventParticipants}),
  revokeParticipantApplication: jest.fn().mockResolvedValue({...testingEventParticipants}),
  banUser: jest.fn(),
  unbanUser: jest.fn(),
};

describe("AdminController (Unit)", () => {

  const sut = new AdminController(mockedIAdminService, mockedIAdminMailingService);

  describe("adminBansUser", () => {

    it("should call AdminService.banUser() with 2 ids and string", async () => {

      // Arrange
      const user = {...testingUser};
      const userId = "testing123";
      const banUserDto: BanUserDto = { reason: "testing" };

      // Act
      await sut.adminBansUser(user, userId, banUserDto);

      // Assert
      expect(mockedIAdminService.banUser).toBeCalledWith(user.id, userId, banUserDto.reason);

    });

    it("should call AdminMailingService.mailUserOnBan() with user id", async () => {

      // Arrange
      const user = {...testingUser};
      const userId = "testing123";
      const banUserDto: BanUserDto = { reason: "testing" };

      // Act
      await sut.adminBansUser(user, userId, banUserDto);

      // Assert
      expect(mockedIAdminMailingService.mailUserOnBan).toBeCalledWith(userId);

    });

  });

  describe("adminUnbanUser", () => {

    it("should call AdminService.unbanUser() with 2 ids", async () => {

      // Arrange
      const user = {...testingUser};
      const userId = "testing123";

      // Act
      await sut.adminUnbansUser(user, userId);

      // Assert
      expect(mockedIAdminService.unbanUser).toBeCalledWith(user.id, userId);

    });

    it("should call AdminMailingService.mailUserOnUnban() with user id", async () => {

      // Arrange
      const user = {...testingUser};
      const userId = "testing123";

      // Act
      await sut.adminUnbansUser(user, userId);

      // Assert
      expect(mockedIAdminMailingService.mailUserOnUnban).toBeCalledWith(userId);

    });

  });

  describe("adminConfirmsEventApplication", () => {

    it("should call AdminService.confirmParticipantApplication() with 2 ids", async () => {

      // Arrange
      const user = {...testingUser};
      const confirmationId = "testing123";

      // Act
      await sut.adminConfirmsEventApplication(user, confirmationId);

      // Assert
      expect(mockedIAdminService.confirmParticipantApplication).toBeCalledWith(user.id, confirmationId);

    });

    it("should call AdminMailingService.mailUserOnSuccessfulApplication() with confirmation id", async () => {

      // Arrange
      const user = {...testingUser};
      const confirmationId = "testing123";
      
      // Act
      await sut.adminConfirmsEventApplication(user, confirmationId);

      // Assert
      expect(mockedIAdminMailingService.mailUserOnSuccessfulApplication)
        .toBeCalledWith(testingEventParticipants.userId);

    });

  });

  describe("adminRevokesEventConfirmation", () => {

    it("should call AdminService.revokeParticipantApplication() with 2 ids", async () => {

      // Arrange
      const user = {...testingUser};
      const confirmationId = "testing123";

      // Act
      await sut.adminRevokesEventConfirmation(user, confirmationId);

      // Asert
      expect(mockedIAdminService.revokeParticipantApplication).toBeCalledWith(user.id, confirmationId);

    });

    it("should call AdminMailingService.mailUserOnFailedApplication() with confirmation id", async () => {

      // Arrange
      const user = {...testingUser};
      const confirmationId = "testing123";

      // Act
      await sut.adminRevokesEventConfirmation(user, confirmationId);

      // Assert
      expect(mockedIAdminMailingService.mailUserOnFailedApplication).toBeCalledWith(testingEventParticipants.userId);

    });

  });

});
