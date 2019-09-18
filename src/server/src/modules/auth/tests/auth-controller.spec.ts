import { SessionManager } from "../../session/SessionManager";
import { AuthService } from "../auth.service";
import { AuthController } from "../auth.controller";

import { IAuthenticatedUsersArray, PasswordPlainText } from "./constants/IAuthenticatedUsersArray";
import { IUserServiceImpl } from "./mocks/IUserServiceImpl";
import { ISessionServiceImpl } from "./mocks/ISessionServiceImpl";
import { async } from "rxjs/internal/scheduler/async";

describe("AuthController (Unit)", () => {
  describe("logOut", () => {
    const sessionManager = new SessionManager(null);
    sessionManager.destroySession = jest.fn();

    const sut = new AuthController(
      new AuthService(
        new IUserServiceImpl(),
        new ISessionServiceImpl(),
      ),
      sessionManager,
    );

    it("should call ISessionManager.destroySession() once when given a valid token", async () => {
      // Arrange
      const token = IAuthenticatedUsersArray[0].token;

      // Act
      sut.logOut(token);

      // Assert
      expect(sessionManager.destroySession).toBeCalled();
    });
  });

  describe("logIn", () => {
    const sut = new AuthController(
      new AuthService(
        new IUserServiceImpl(),
        new ISessionServiceImpl(),
      ),
      {
        destroySession: jest.fn(),
        createSession: jest.fn().mockResolvedValue({token: "testing"}),
        validateSession: jest.fn(),
      },
    );

    it("should return an object with a property token when given valid credentials", async () => {
      // Arrange
      const username = IAuthenticatedUsersArray[0].username;
      const password = PasswordPlainText;

      // Act
      const result = await sut.login({username, password}, "testing", "testing");

      // Assert
      // @ts-ignore
      expect(result.token).toBeTruthy();
    });

    it("should return an 'UnprocessableEntityException' when given invalid credentials", async () => {
      // Arrange
      const username = "IAuthenticatedUsersArray[0].username";
      const password = "IAuthenticatedUsersArray[0].password";

      // Act
      const result = async () => sut.login({username, password}, "testing", "testing");

      // Assert
      await expect(result()).rejects.toThrow();
    });
  });
});
