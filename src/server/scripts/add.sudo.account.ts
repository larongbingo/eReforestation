import "../src/modules/database/DatabaseConnection";
import { User } from "../src/modules/database/models/User.Model";
import { Permission } from "../src/modules/database/models/Permission.Model";
import { UserPermissions } from "../../interfaces/models/IPermissions";

(async function() {
  try {
    const user = await User.create({username: "admin123", password: "admin123"});
    await Permission.create({userId: user.id, permission: UserPermissions.Superuser});
    process.exit(0);
  }
  catch(err) {
    console.error(err);
    process.exit(1);
  }
})();
