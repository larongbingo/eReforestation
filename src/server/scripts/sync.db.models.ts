import { Sequelize } from "sequelize";

import { DatabaseConnection as connection } from "../src/modules/database/DatabaseConnection";
import { ServiceDatabaseConnection as serviceConnection } from "../src/modules/database/ServiceDatabase.Connection";

(async function() {
  if(process.env.NODE_ENV === "production") {
    console.log("SCRIPT WILL NOT RUN SINCE IT WAS RAN IN A PRODUCTION ENVIRONMENT");
    process.exit(2);
  }

  try {
    await connection.query(`DROP DATABASE ${connection.options.database};`);
    await connection.query(`CREATE DATABASE ${connection.options.database}`);
    await connection.query(`USE ${connection.options.database}`);

    await connection.sync({force: true});

    await serviceConnection.query(`DROP DATABASE ${serviceConnection.options.database}`);
    await serviceConnection.query(`CREATE DATABASE ${serviceConnection.options.database}`);
    await serviceConnection.query(`USE ${serviceConnection.options.database}`);

    await serviceConnection.sync({force: true});
  }
  catch(err) {
    console.log(err);
    process.exit(1);
  }

  process.exit(0);
})();
