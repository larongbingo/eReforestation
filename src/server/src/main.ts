import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as compression from "compression";
import helmet = require("helmet");
import cors = require("cors");

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transform: true }));
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  const port = process.env.NODE_ENV === "production" ? 80 : 8080;
  await app.listen(port);
}
bootstrap();
