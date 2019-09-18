import { IEventService } from "../../../../../interfaces/services/IEventService";
import { IPermissionService } from "../../../../../interfaces/services/IPermissionService";
import { IEvent } from "../../../../../interfaces/models/IEvent";
import { IUser } from "../../../../../interfaces/models/IUser";
import { EventController } from "../Event.Controller";
import { async } from "rxjs/internal/scheduler/async";

const testingEvent: IEvent = {
  id: "123",
  title: "testing",
  location: "testing",
  date: new Date(),
  description: "testing",
  status: "Go",
};

const testingUser: IUser = {
  id: "123",
  username: "testing",
  password: "testing",
};

const mockedIEventService: IEventService = {
  findOneById: jest.fn().mockResolvedValue({...testingEvent}),
  createEvent: jest.fn().mockResolvedValue({...testingEvent}),
  updateEvent: jest.fn().mockResolvedValue({...testingEvent}),
  getEvents: jest.fn().mockResolvedValue([{...testingEvent}]),
};

const mockedIPermissionService: IPermissionService = {
  isUserAdmin: jest.fn().mockResolvedValue(true),
  isUserAdminOrSuperUser: jest.fn().mockResolvedValue(true),
  isUserParticipant: jest.fn().mockResolvedValue(true),
  isUserSuperUser: jest.fn().mockResolvedValue(true),
  getPermission: jest.fn().mockResolvedValue("Admin"),
  setAdminPermission: jest.fn().mockResolvedValue(true),
  setParticipantPermission: jest.fn().mockResolvedValue(true),
  setSuperUserPermission: jest.fn().mockResolvedValue(true),
};

describe("EventController (Unit)", () => {

  const sut = new EventController(
    mockedIEventService,
    mockedIPermissionService,
  );

  describe("getEvents", () => {

    it("should have a events that holds a list of events", async () => {

      // Act
      const result = await sut.getEvents();

      // Assert
      expect(result.events.length).toBe(1);

    });

    it("should call getEvents", async () => {

      // Act
      await sut.getEvents();

      // Assert
      expect(mockedIEventService.getEvents).toBeCalled();

    });

  });

  describe("createEvent", () => {

    it("should throw an UnauthorizedException when user does not have admin rights", async () => {
      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      const result = async () => sut.createEvent(event, user);

      // Assert
      await expect(result()).rejects.toThrow();
    });

    it("should return a proper response when user does have admin rights", async () => {

      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      const result = await sut.createEvent(event, user);

      // Assert
      // @ts-ignore
      expect(result.iat).not.toBeNull();

    });

    it("should recieve the details of the new event", async () => {

      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.createEvent(event, user);

      // Assert
      expect(mockedIEventService.createEvent).toBeCalledWith(event);

    });

    it("should call PermissionService.isUserAdminOrSuperUser()", async () => {

      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.createEvent(event, user);

      // Assert
      expect(mockedIPermissionService.isUserAdminOrSuperUser).toBeCalled();

    });

    it("should call EventService.createEvent()", async () => {

      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      await sut.createEvent(event, user);

      // Assert
      expect(mockedIEventService.createEvent).toBeCalled();

    });

  });

  describe("updateEvent", () => {

    it("should return an UnauthorizedException when user does not have admin rights", async () => {
      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(false);

      // Act
      // @ts-ignore
      const result = async () => sut.updateEvent(event.id, event, user);

      // Assert
      await expect(result()).rejects.toThrow();
    });

    it("should return a proper response when user does have admin rights", async () => {
      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      // @ts-ignore
      const result = await sut.updateEvent(event.id, event, user);

      // Assert
      // @ts-ignore
      expect(result.iat).toBeTruthy();
    });

    it("should recieve the new details of the event", async () => {

      // Arrange
      const event = {...testingEvent};
      const user = {...testingUser};
      mockedIPermissionService.isUserAdminOrSuperUser = jest.fn().mockResolvedValue(true);

      // Act
      // @ts-ignore
      await sut.updateEvent(event.id, event, user);

      // Assert
      expect(mockedIEventService.updateEvent).toBeCalledWith(event, event.id);

    });

  });

});
