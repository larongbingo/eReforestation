// tslint:disable: tsr-detect-sql-literal-injection
import { NestFactory } from "@nestjs/core";

import { AppModule } from "../src/app.module";
import { DatabaseConnection } from "../src/modules/database/DatabaseConnection";
import { ServiceDatabaseConnection } from "../src/modules/database/ServiceDatabase.Connection";

(async function() {
  if(process.env.NODE_ENV === "production") {
    console.log("SCRIPT WILL NOT RUN SINCE IT WAS RAN IN A PRODUCTION ENVIRONMENT");
    process.exit(2);
  }

  const app = await NestFactory.create(AppModule);
  const mainConnection = app.get(DatabaseConnection);
  const serviceConnection = app.get(ServiceDatabaseConnection);

  try {
    await mainConnection.connection.query(`DROP DATABASE ${mainConnection.connection.options.database};`);
    await mainConnection.connection.query(`CREATE DATABASE ${mainConnection.connection.options.database}`);
    await mainConnection.connection.query(`USE ${mainConnection.connection.options.database}`);
    await mainConnection.connection.sync({force: true});

    await serviceConnection.connection.query(`DROP DATABASE ${serviceConnection.connection.options.database}`);
    await serviceConnection.connection.query(`CREATE DATABASE ${serviceConnection.connection.options.database}`);
    await serviceConnection.connection.query(`USE ${serviceConnection.connection.options.database}`);
    await serviceConnection.connection.sync({force: true});
  }
  catch(err) {
    console.log(err);
    process.exit(1);
  }

  process.exit(0);
})();
