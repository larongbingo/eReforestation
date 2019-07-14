import { createParamDecorator } from "@nestjs/common";

export const IpAddress = createParamDecorator((data, req) => {
  return req.connection.remoteAddress;
});
