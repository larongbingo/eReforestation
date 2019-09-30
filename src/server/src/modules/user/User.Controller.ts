import { Controller, Inject, Delete, UseGuards, Post, Put, Body, Get, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiUseTags, ApiCreatedResponse, ApiImplicitHeader, ApiImplicitQuery } from "@nestjs/swagger";

import { ITextsService } from "../../../../interfaces/services/ITextsService";
import { IPermissionService } from "../../../../interfaces/services/IPermissionService";
import { IUserDetailsService } from "../../../../interfaces/services/IUserDetailsService";
import { IUserService } from "../../../../interfaces/services/IUserService";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { IUser } from "../../../../interfaces/models/IUser";
import { User } from "../database/models/User.Model";
import { TEXTS_KEYS } from "../texts/Texts.Key";

import { CreateUserAndDetailsDto } from "./dto/CreateUserAndDetails.Dto";
import { CreateUserDto } from "./dto/CreateUser.Dto";
import { UpdateUserDto } from "./dto/UpdateUser.Dto";

@Controller("/user")
export class UserContoller {

  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
    @Inject(IUserDetailsService) private readonly userDetailsService: IUserDetailsService,
    @Inject(ITextsService) private readonly texts: ITextsService,
  ) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return {iat: Date.now(), id: user.id};
    } catch (err) {
      if (err.message.match(/(is already taken)?/)) {
        return {iat: Date.now(), message: this.texts.getText(TEXTS_KEYS.USER_USERNAME_TAKEN)};
      }
    }
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Create Account with Details"})
  @Post("/new")
  public async createUserAndDetails(@Body() createUserAndDetails: CreateUserAndDetailsDto) {
    const user = await this.userService.createUser(createUserAndDetails);
    this.userDetailsService.createDetails(createUserAndDetails, user.id);
    return {iat: Date.now(), userId: user.id};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Confirmation of Account Deletion"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "Informs the user that the confirmation of deletion has been sent to their email"})
  @Delete()
  @UseGuards(AuthGuard("bearer"))
  public async deleteUser(@UserEntity() user: User) {
    await this.userService.sendConfirmationOfDeletion(user.id);
    return {iat: Date.now(), messageSent: true};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Account Deletion"})
  @ApiImplicitQuery({name: "confirm", required: true})
  @Get()
  public async confirmDeleteUser(@Query("confirm") confirm: string) {
    const userIdDeletion = await this.userService.findDeletionConfirmation(confirm);

    if (userIdDeletion) {
      await this.userService.destroyUser(userIdDeletion.userId);
      return {iat: Date.now(), userIdDestroyed: userIdDeletion.userId};
    }

    return {iat: Date.now(), message: this.texts.getText(TEXTS_KEYS.USER_WRONG_CONFIRM_STR)};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Account Deletion"})
  @Put()
  public async updateUser(@Body() updateUserDto: UpdateUserDto, @UserEntity() user: User) {
    Object.keys(updateUserDto).forEach(key => user[key] = updateUserDto[key]);
    user.save();
    return {iat: Date.now()};
  }
}
