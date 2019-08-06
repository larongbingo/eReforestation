import { Injectable, Inject } from "@nestjs/common";
import { HealthCheckError } from "@godaddy/terminus";
import { HealthIndicatorResult, HealthIndicator } from "@nestjs/terminus";
import { Sequelize } from "sequelize-typescript";

import { DatabaseConnectionKey } from "../database/DatabaseConnection";

@Injectable()
export class MySQLConnectionHealthIndicator extends HealthIndicator {
  constructor(
    @Inject(DatabaseConnectionKey) private readonly db: Sequelize,
  ) {
    super();
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.db.authenticate();
    } catch (err) {
      throw new HealthCheckError("Cannot query to Database", err.message);
    }

    return this.getStatus(key, true, null);
  }
}
