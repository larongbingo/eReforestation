import { Sequelize } from "sequelize";

import { DatabaseConnection as connection } from "../src/modules/database/DatabaseConnection";

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
  }
  catch(err) {
    console.log(err);
    process.exit(1);
  }

  process.exit(0);
})();
