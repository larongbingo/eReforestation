import { Controller, Inject, Get, Put, Post, Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOkResponse, ApiUseTags, ApiImplicitHeader, ApiOperation } from "@nestjs/swagger";

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

  @ApiUseTags("Participant")
  @ApiOperation({title: "Get Contact Person Details"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The details of the emergency contact person assigned to the user"})
  @Get()
  @UseGuards(AuthGuard("bearer"))
  public async getContactPerson(@UserEntity() user: IUser) {
    const contactPersonDetails = await this.contactPersonService.getContactPerson(user.id);
    return {iat: Date.now(), contactPersonDetails};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Create Contact Person Details"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "Reflects the details of the emergency contact person assigned to the user"})
  @Put()
  @UseGuards(AuthGuard("bearer"))
  public async createContactPerson(@Body() contactPersonCreateDto: ContactPersonCreateDto, @UserEntity() user: IUser) {
    const contactPersonDetails = await this.contactPersonService.createContactPerson(contactPersonCreateDto, user.id);
    return {iat: Date.now(), contactPersonDetails};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Get Contact Person Details"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The details of the emergency contact person assigned to the user"})
  @Post()
  @UseGuards(AuthGuard("bearer"))
  public async updateContactPerson(@Body() contactPersonUpdateDto: ContactPersonUpdateDto, @UserEntity() user: IUser) {
    const contactPersonDetails = await this.contactPersonService.updateContactPerson(contactPersonUpdateDto, user.id);
    return {iat: Date.now(), contactPersonDetails};
  }
}
