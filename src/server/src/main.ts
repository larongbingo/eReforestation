import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import compression = require("compression");
import helmet = require("helmet");
import cors = require("cors");
import express from "express";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transform: true }));
  app.use("/images", express.static("static"));
  app.use(express.json({limit: "100mb"}));
  app.use(express.urlencoded({limit: "100mb", extended: true}));
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  await app.listen(8080);
}
bootstrap();
