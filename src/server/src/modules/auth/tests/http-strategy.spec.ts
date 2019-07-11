import { HttpStrategy } from "../http.strategy";

import { ISessionVerifyImpl } from "./mocks/ISessionVerifyImpl";

describe("HttpStrategy (Unit)", () => {
  const sut = new HttpStrategy(new ISessionVerifyImpl());

  describe("validate", () => {
    it("should return an non-empty object if a valid token is passed", () => {
      // Arrange
      const token = "testing1";

      // Act
      const result = sut.validate(token);

      // Assert
      expect(result).resolves.not.toBe(null);
    });

    it("should throw 'UnauthorizedException' when if an empty string is passed", async () => {
      // Arrange
      const token = "";

      try {
        // Act
        await sut.validate(token);
      } catch (err) {
        // Assert
        expect(err.status).toBe(401);
      }
    });
  });
});
