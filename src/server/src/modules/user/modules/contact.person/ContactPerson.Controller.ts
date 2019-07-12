import { Controller, Inject, Get, Put, Post, Body } from "@nestjs/common";

import { IUser } from "../../../../../../interfaces/models/IUser";
import { IContactPersonService } from "../../../../../../interfaces/services/IContactPersonService";
import { UserEntity } from "../../../../decorators/User-Entity.Decorator";

import { ContactPersonCreateDto } from "./dto/ContactPersonCreate.Dto";
import { ContactPersonUpdateDto } from "./dto/ContactPersonUpdate.Dto";

@Controller("/user/contact-person")
export class ContactPersonController {
  constructor(
    @Inject(IContactPersonService) private readonly contactPersonService: IContactPersonService,
  ) {}

  @Get()
  public async getContactPerson(@UserEntity() user: IUser) {
    const contactPersonDetails = await this.contactPersonService.getContactPerson(user.id);
    return {iat: Date.now(), contactPersonDetails};
  }

  @Post()
  public async createContactPerson(@Body() contactPersonCreateDto: ContactPersonCreateDto, @UserEntity() user: IUser) {
    const contactPersonDetails = await this.contactPersonService.createContactPerson(contactPersonCreateDto, user.id);
    return {iat: Date.now(), contactPersonDetails};
  }

  @Put()
  public async updateContactPerson(@Body() contactPersonUpdateDto: ContactPersonUpdateDto, @UserEntity() user: IUser) {
    const contactPersonDetails = await this.contactPersonService.updateContactPerson(contactPersonUpdateDto, user.id);
    return {iat: Date.now(), contactPersonDetails};
  }
}
