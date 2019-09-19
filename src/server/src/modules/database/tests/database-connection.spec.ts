import { DatabaseConnection } from "../DatabaseConnection";

describe("DatabaseConnection (Unit)", () => {
  it("should have a connection object", () => {
    expect(DatabaseConnection).not.toBeNull();
  });
});
