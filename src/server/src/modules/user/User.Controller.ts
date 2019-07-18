import { Controller, Inject, Delete, UseGuards, Post, Put, Body } from "@nestjs/common";
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
    const user = await this.userService.createUser(createUserDto);
    return {iat: Date.now(), user};
  }

  @Delete()
  @UseGuards(AuthGuard("bearer"))
  public async deleteUser(@UserEntity() user: User) {
    // TODO: Implement the mailing service
    throw new Error("Method not implemented");
  }

  @Put()
  public async updateUser(@Body() updateUserDto: UpdateUserDto, @UserEntity() user: User) {
    Object.keys(updateUserDto).forEach(key => user[key] = updateUserDto[key]);
    return {iat: Date.now()};
  }
}
