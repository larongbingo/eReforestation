import { IUser } from "../../../../../../../interfaces/models/IUser";
import { IEventParticipants } from "../../../../../../../interfaces/models/IEventParticipants";
import { IEventParticipantsService } from "../../../../../../../interfaces/services/IEventParticipantsService";
import { EventParticipantsController } from "../EventParticipants.Controller";

const testingUser: IUser = {
  id: "testing",
  username: "testing",
  password: "testing",
};

const testingEventParticipation: IEventParticipants = {
  id: "testing",
  userId: "testing",
  eventId: "testing",
  confirmed: true,
};

const mockedIEventParticipantsService: IEventParticipantsService = {
  joinEvent: jest.fn().mockResolvedValue("testing"),
  leaveEvent: jest.fn().mockResolvedValue(null),
  findOneById: jest.fn().mockResolvedValue(testingEventParticipation),
  updateOneById: jest.fn().mockResolvedValue(testingEventParticipation),
};

describe("EventParticipantsController (Unit)", () => {

  const sut = new EventParticipantsController(mockedIEventParticipantsService);

  describe("joinEvent", () => {

    it("should return a string when called", async () => {

      // Arrange
      const eventId = testingEventParticipation.eventId;
      const user = { ...testingUser };

      // Act
      const result = await sut.joinEvent(eventId, user);

      // Assert
      expect(result.confirmationString).toEqual("testing");

    });

    it("should call EventParticipantService.joinEvent()", async () => {

      // Arrange
      const eventId = testingEventParticipation.eventId;
      const user = { ...testingUser };

      // Act
      await sut.joinEvent(eventId, user);

      // Assert
      expect(mockedIEventParticipantsService.joinEvent).toBeCalled();

    });

  });

  describe("leaveEvent", () => {

    it("should call EventParticipantService.leaveEvent()", async () => {

      // Arrange
      const eventId = testingEventParticipation.eventId;
      const user = { ...testingUser };

      // Act
      await sut.leaveEvent(eventId, user);

      // Assert
      expect(mockedIEventParticipantsService.leaveEvent).toBeCalled();

    });

  });

});
