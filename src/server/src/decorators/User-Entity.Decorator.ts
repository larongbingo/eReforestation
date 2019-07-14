import { createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const UserEntity = createParamDecorator((data, req: Request) => req.user);
