import { DatabaseConnection, DatabaseConnectionProvider } from "../DatabaseConnection";

describe("DatabaseConnection (Unit)", () => {
  it("should have a connection object", () => {
    expect(DatabaseConnection).not.toBeNull();
  });

  it("should have a providers object", () => {
    expect(DatabaseConnectionProvider).not.toBeNull();
  });
});
