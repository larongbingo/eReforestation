import { isDateToday } from "../libs/dates";

describe("Dates Module", () => {
  describe("isDateToday", () => {
    it("should return true when given date matches", () => {
      // Arrange
      const date = new Date();

      // Act
      const result = isDateToday(date);

      // Assert
      expect(result).toBeTruthy();
    });
 
    it("should return false when given does not match", () => {
      // Arrange
      const date = new Date("1/1/2019");

      // Act
      const result = isDateToday(date);

      // Assert
      expect(result).toBeFalsy();
    });
  });
});
