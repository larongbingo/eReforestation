import { Injectable, Inject } from "@nestjs/common";
import { HealthCheckError } from "@godaddy/terminus";
import { HealthIndicatorResult, HealthIndicator } from "@nestjs/terminus";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { TEXTS_KEYS } from "../texts/Texts.Key";

@Injectable()
export class MySQLConnectionHealthIndicator extends HealthIndicator {
  constructor(
    @Inject(DatabaseConnection) private readonly db: DatabaseConnection,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {
    super();
  }

  public async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.db.connection.authenticate();
    } catch (err) {
      throw new HealthCheckError(this.texts.getText(TEXTS_KEYS.HEALTH_CANT_QUERY_DB), err.message);
    }

    return this.getStatus(key, true, null);
  }
}
