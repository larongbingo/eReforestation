import { createParamDecorator } from "@nestjs/common";

export const UserAgent = createParamDecorator((data, req) => {
  return req.headers["user-agent"];
});
