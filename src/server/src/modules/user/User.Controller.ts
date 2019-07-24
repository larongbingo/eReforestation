import { Controller, Inject, Delete, UseGuards, Post, Put, Body, Get, Query } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { IUserService } from "../../../../interfaces/services/IUserService";
import { UserEntity } from "../../decorators/User-Entity.Decorator";
import { IUser } from "../../../../interfaces/models/IUser";
import { User } from "../database/models/User.Model";

import { CreateUserDto } from "./dto/CreateUser.Dto";
import { UpdateUserDto } from "./dto/UpdateUser.Dto";

@Controller("/user")
export class UserContoller {

  constructor(
    @Inject(IUserService) private readonly userService: IUserService,
  ) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return {iat: Date.now(), id: user.id};
    } catch (err) {
      if (err.message.match(/(is already taken)?/)) {
        return {iat: Date.now(), message: "Username is already taken"};
      }
    }
  }

  @Delete()
  @UseGuards(AuthGuard("bearer"))
  public async deleteUser(@UserEntity() user: User) {
    await this.userService.sendConfirmationOfDeletion(user.id);
    return {iat: Date.now(), messageSent: true};
  }

  @Get()
  public async confirmDeleteUser(@Query("confirm") confirm: string) {
    const userIdDeletion = await this.userService.findDeletionConfirmation(confirm);

    if (userIdDeletion) {
      await this.userService.destroyUser(userIdDeletion.userId);
      return {iat: Date.now(), userIdDestroyed: userIdDeletion.userId};
    }

    return {iat: Date.now(), message: "Incorrect confirmation string"};
  }

  @Put()
  public async updateUser(@Body() updateUserDto: UpdateUserDto, @UserEntity() user: User) {
    Object.keys(updateUserDto).forEach(key => user[key] = updateUserDto[key]);
    return {iat: Date.now()};
  }
}
