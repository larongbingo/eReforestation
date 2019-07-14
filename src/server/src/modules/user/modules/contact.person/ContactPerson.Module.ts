import { Module } from "@nestjs/common";

import { ContactPersonServiceProvider } from "./ContactPerson.Service";
import { ContactPersonController } from "./ContactPerson.Controller";

@Module({
  controllers: [ContactPersonController],
  providers: [ContactPersonServiceProvider],
})
export class ContactPersonModule {}
