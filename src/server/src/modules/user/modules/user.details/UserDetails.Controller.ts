import { Controller, UseGuards, Get, Post, Put, Inject, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { UserEntity } from "../../../../decorators/User-Entity.Decorator";
import { User } from "../../../database/models/User.Model";
import { IUserDetailsService } from "../../../../../../interfaces/services/IUserDetailsService";

import { UserDetailsCreateDto } from "./dto/UserDetailsCreate.Dto";
import { UserDetailsUpdateDto } from "./dto/UserDetailsUpdate.Dto";

@Controller("/user/details")
export class UserDetailsController {
  constructor(    
    @Inject(IUserDetailsService) private readonly userDetailsService: IUserDetailsService,
  ) {}
  
  @Get()
  @UseGuards(AuthGuard("bearer"))
  public async getDetails(@UserEntity() user: User) {
    const userDetails = this.userDetailsService.getDetails(user.id);
    return {iat: Date.now(), userDetails};
  }

  @Post()
  @UseGuards(AuthGuard("bearer"))
  public async updateDetails(@Body() userDetailsUpdateDto: UserDetailsUpdateDto, @UserEntity() user: User) {
    const userDetails = this.userDetailsService.updateDetails(userDetailsUpdateDto, user.id);
    return {iat: Date.now(), userDetails};
  }

  @Put()
  @UseGuards(AuthGuard("bearer"))
  public async createDetails(@Body() userDetailsCreateDto: UserDetailsCreateDto, @UserEntity() user: User) {
    const userDetails = this.userDetailsService.createDetails(userDetailsCreateDto, user.id);
    return {iat: Date.now(), userDetails};
  }
}
