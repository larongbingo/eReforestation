import { DatabaseConnectionConfig } from "../DatabaseConnectionConfig";

describe("DatabaseConnectionConfig (Unit)", () => {
  const config = new DatabaseConnectionConfig();

  it("should have a property known as port", () => {
    // @ts-ignore
    expect(config.port).not.toBeNull();
  });

  it("should have a property known as host", () => {
    // @ts-ignore
    expect(config.host).not.toBeNull();
  });

  it("should have a property known as username", () => {
    // @ts-ignore
    expect(config.username).not.toBeNull();
  });

  it("should have a property known as password", () => {
    // @ts-ignore
    expect(config.password).not.toBeNull();
  });

  it("should have a property known as database", () => {
    // @ts-ignore
    expect(config.database).not.toBeNull();
  });

});
