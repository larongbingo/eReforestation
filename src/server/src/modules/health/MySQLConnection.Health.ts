import { Injectable, Inject } from "@nestjs/common";
import { HealthCheckError } from "@godaddy/terminus";
import { HealthIndicatorResult, HealthIndicator } from "@nestjs/terminus";

import { DatabaseConnection } from "../database/DatabaseConnection";

@Injectable()
export class MySQLConnectionHealthIndicator extends HealthIndicator {
  constructor(
    @Inject(DatabaseConnection) private readonly db: DatabaseConnection,
  ) {
    super();
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.db.connection.authenticate();
    } catch (err) {
      throw new HealthCheckError("Cannot query to Database", err.message);
    }

    return this.getStatus(key, true, null);
  }
}
