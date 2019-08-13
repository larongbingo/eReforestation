import { createParamDecorator } from "@nestjs/common";
import { Request } from "express";

// @ts-ignore
export const UserEntity = createParamDecorator((data, req: Request) => req.user);
