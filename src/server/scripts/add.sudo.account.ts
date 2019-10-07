import { NestFactory } from "@nestjs/core";

import "../src/modules/database/DatabaseConnection";
import { User } from "../src/modules/database/models/User.Model";
import { Permission } from "../src/modules/database/models/Permission.Model";
import { UserPermissions } from "../../interfaces/models/IPermissions";
import { IContactPerson } from "../../interfaces/models/IContactPerson";
import { IUserDetails } from "../../interfaces/models/IUserDetails";
import { UserDetails } from "../src/modules/database/models/UserDetails.Model";
import { ContactPerson } from "../src/modules/database/models/ContactPerson.Model";
import { AppModule } from "../src/app.module";

(async function() {
  await NestFactory.create(AppModule);

  const adm = "Admin";
  const userDetails: IUserDetails = {
    firstName: adm,
    middleName: adm,
    lastName: adm,
    // @ts-ignore
    dateOfBirth: "05-05-1998",
    address: adm,
    emailAddress: "admin@admin.com",
    phoneNumber: "123123123"
  };

  const contactPerson: IContactPerson = {
    firstName: adm,
    middleName: adm,
    lastName: adm,
    address: adm,
    phoneNumber: "123123123123",
    emailAddress: "admin@admin.com",
  };

  try {
    const user = await User.create({username: "admin123", password: "admin123"});
    await Permission.create({userId: user.id, permission: UserPermissions.Superuser});
    await UserDetails.create({...userDetails, userId: user.id});
    await ContactPerson.create({...contactPerson, userId: user.id});
    process.exit(0);
  }
  catch(err) {
    console.error(err);
    process.exit(1);
  }
})();
