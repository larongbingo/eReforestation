import { AuthService } from "../auth.service";

import { IAuthenticatedUsersArray, PasswordPlainText } from "./constants/IAuthenticatedUsersArray";
import { IUserServiceImpl } from "./mocks/IUserServiceImpl";
import { ISessionServiceImpl } from "./mocks/ISessionServiceImpl";

describe("AuthService (Unit)", () => {
  const sut = new AuthService(
    new IUserServiceImpl(),
    new ISessionServiceImpl(),
  );

  describe("validateUser", () => {
    it("should return IUser when given a valid token", () => {
      // Arrange
      const token = IAuthenticatedUsersArray[0].token;

      // Act
      const result = sut.validateUser(token);

      // Assert
      expect(result).resolves.toBe(IAuthenticatedUsersArray[0]);
    });

    it("should return null when given an invalid token", () => {
      // Arrange
      const token = "This is an invalid token";

      // Act
      const result = sut.validateUser(token);

      // Assert
      expect(result).resolves.toBeNull();
    });

    it("should return null when given an empty string", () => {
      // Arrange
      const token = "";

      // Act
      const result = sut.validateUser(token);

      // Assert
      expect(result).resolves.toBeNull();
    });

    it("should return null when given null", () => {
      // Arrange
      const token = "This is an invalid token";

      // Act
      const result = sut.validateUser(token);

      // Assert
      expect(result).resolves.toBeNull();
    });
  });

  describe("checkCredentials", () => {
    it("should return IUser when given valid username and password", () => {
      // Arrange
      const username = IAuthenticatedUsersArray[0].username;

      // And
      const password = PasswordPlainText;

      // Act
      const result = sut.checkCredentials(username, password);

      // Assert
      expect(result).resolves.toBe(IAuthenticatedUsersArray[0]);
    });

    it("should return null when given valid username and invalid password", () => {
      // Arrange
      const username = IAuthenticatedUsersArray[0].username;

      // And
      const password = "IAuthenticatedUsersArray[0].password";

      // Act
      const result = sut.checkCredentials(username, password);

      // Assert
      expect(result).resolves.toBeNull();
    });

    it("should return null when given invalid username and valid password", () => {
      // Arrange
      const username = "IAuthenticatedUsersArray[0].username";

      // And
      const password = PasswordPlainText;

      // Act
      const result = sut.checkCredentials(username, password);

      // Assert
      expect(result).resolves.toBeNull();
    });

    it("should return null when given null on both fields", () => {
      // Arrange
      const username = null;

      // And
      const password = null;

      // Act
      const result = sut.checkCredentials(username, password);

      // Assert
      expect(result).resolves.toBeNull();
    });

    it("should return null when given empty strings on both fields", () => {
      // Arrange
      const username = "";

      // And
      const password = "";

      // Act
      const result = sut.checkCredentials(username, password);

      // Assert
      expect(result).resolves.toBeNull();
    });
  });
});
