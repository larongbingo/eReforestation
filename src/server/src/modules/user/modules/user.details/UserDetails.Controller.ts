import { Controller, UseGuards, Get, Post, Put, Inject, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiUseTags, ApiOperation, ApiOkResponse, ApiImplicitHeader, ApiCreatedResponse } from "@nestjs/swagger";

import { UserEntity } from "../../../../decorators/User-Entity.Decorator";
import { IUser } from "../../../../../../interfaces/models/IUser";
import { IUserDetailsService } from "../../../../../../interfaces/services/IUserDetailsService";

import { UserDetailsCreateDto } from "./dto/UserDetailsCreate.Dto";
import { UserDetailsUpdateDto } from "./dto/UserDetailsUpdate.Dto";

@Controller("/user/details")
export class UserDetailsController {
  constructor(
    @Inject(IUserDetailsService) private readonly userDetailsService: IUserDetailsService,
  ) {}

  @ApiUseTags("Participant")
  @ApiOperation({title: "Get Account Details"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiOkResponse({description: "The personal details of the user"})
  @Get()
  @UseGuards(AuthGuard("bearer"))
  public async getDetails(@UserEntity() user: IUser) {
    const userDetails = await this.userDetailsService.getDetails(user.id);
    return {iat: Date.now(), userDetails};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Update Account Details"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "Updates the personal details of the user"})
  @Post()
  @UseGuards(AuthGuard("bearer"))
  public async updateDetails(@Body() userDetailsUpdateDto: UserDetailsUpdateDto, @UserEntity() user: IUser) {
    const userDetails = await this.userDetailsService.updateDetails(userDetailsUpdateDto, user.id);
    return {iat: Date.now(), userDetails};
  }

  @ApiUseTags("Participant")
  @ApiOperation({title: "Create Account Details"})
  @ApiImplicitHeader({name: "Authorization", required: true})
  @ApiCreatedResponse({description: "Reflects the personal details of the user"})
  @Put()
  @UseGuards(AuthGuard("bearer"))
  public async createDetails(@Body() userDetailsCreateDto: UserDetailsCreateDto, @UserEntity() user: IUser) {
    const userDetails = await this.userDetailsService.createDetails(userDetailsCreateDto, user.id);
    return {iat: Date.now(), userDetails};
  }
}
